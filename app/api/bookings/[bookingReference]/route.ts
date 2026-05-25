import { connectToDatabase } from "../../../../lib/mongodb";

type BookingRouteProps = {
  params: Promise<{
    bookingReference: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: BookingRouteProps
) {
  const { bookingReference } = await params;

  const db = await connectToDatabase();

  const booking = await db.collection("bookings").findOne({
    bookingReference,
  });

  if (!booking) {
    return Response.json(
      { error: "Booking not found" },
      { status: 404 }
    );
  }

  return Response.json(booking);
}

export async function DELETE(
  request: Request,
  { params }: BookingRouteProps
) {
  const { bookingReference } = await params;

  const db = await connectToDatabase();

  const result = await db.collection("bookings").deleteOne({
    bookingReference,
  });

  if (result.deletedCount === 0) {
    return Response.json(
      { error: "Booking not found" },
      { status: 404 }
    );
  }

  return Response.json({
    message: "Booking cancelled",
    bookingReference,
  });
}