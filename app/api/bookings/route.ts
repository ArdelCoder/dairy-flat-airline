import { connectToDatabase } from "../../../lib/mongodb";

export async function GET() {
  const db = await connectToDatabase();

  const bookings = await db
    .collection("bookings")
    .find({})
    .toArray();

  return Response.json(bookings);
}

export async function POST(request: Request) {
  try {
    const bookingData = await request.json();

    const db = await connectToDatabase();

    const requestedSeats = Number(bookingData.numberOfPassengers);
    const capacity = Number(bookingData.capacity);
    const normalisedEmail = String(bookingData.email).trim().toLowerCase();

    if (!bookingData.passengerName || !normalisedEmail) {
      return Response.json(
        { error: "Passenger name and email are required." },
        { status: 400 }
      );
    }

    if (!requestedSeats || requestedSeats < 1) {
      return Response.json(
        { error: "Passenger count must be at least 1." },
        { status: 400 }
      );
    }

    const existingBookings = await db
      .collection("bookings")
      .find({ flightNo: bookingData.flightNo })
      .toArray();

    const alreadyBookedSeats = existingBookings.reduce(
      (total, booking) => total + Number(booking.numberOfPassengers || 1),
      0
    );

    if (alreadyBookedSeats + requestedSeats > capacity) {
      return Response.json(
        {
          error: `Not enough seats available. ${capacity - alreadyBookedSeats} seat(s) remaining.`,
        },
        { status: 400 }
      );
    }

    const bookingReference = `DF-${Math.floor(Math.random() * 1000000)}`;

    const booking = {
      bookingReference,
      passengerName: bookingData.passengerName.trim(),
      email: normalisedEmail,
      flightNo: bookingData.flightNo,
      route: bookingData.route,
      departureDate: bookingData.departureDate,
      departureTime: bookingData.departureTime,
      arrivalTime: bookingData.arrivalTime,
      price: Number(bookingData.price),
      capacity,
      numberOfPassengers: requestedSeats,
      totalPrice: Number(bookingData.totalPrice),
      createdAt: new Date(),
    };

    await db.collection("bookings").insertOne(booking);

    return Response.json(booking);
  } catch (error) {
    console.error("Booking API error:", error);

    return Response.json(
      { error: "Booking failed" },
      { status: 500 }
    );
  }
}