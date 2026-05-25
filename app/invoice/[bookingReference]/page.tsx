import Link from "next/link";

type InvoicePageProps = {
  params: Promise<{
    bookingReference: string;
  }>;
};

async function getBooking(bookingReference: string) {
  const response = await fetch(
    `http://localhost:3000/api/bookings/${bookingReference}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { bookingReference } = await params;
  const booking = await getBooking(bookingReference);

  if (!booking) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <section className="mx-auto max-w-5xl rounded-2xl bg-white p-10 shadow-lg">
          <h1 className="text-4xl font-bold text-slate-900">
            Booking Not Found
          </h1>

          <Link
            href="/search"
            className="mt-8 inline-block rounded-xl bg-slate-900 px-5 py-3 text-white"
          >
            Back to Search
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <section className="mx-auto max-w-5xl rounded-2xl bg-white p-10 shadow-lg">
        <h1 className="text-4xl font-bold text-slate-900">
          Booking Invoice
        </h1>

        <div className="mt-6 rounded-xl border border-slate-300 p-5">
          <p><strong>Booking Reference:</strong> {booking.bookingReference}</p>
          <p><strong>Passenger:</strong> {booking.passengerName}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Flight Number:</strong> {booking.flightNo}</p>
          <p><strong>Route:</strong> {booking.route}</p>
          <p><strong>Departure Date:</strong> {booking.departureDate}</p>
          <p><strong>Departure Time:</strong> {booking.departureTime}</p>
          <p><strong>Arrival Time:</strong> {booking.arrivalTime}</p>
          <p><strong>Passengers:</strong> {booking.numberOfPassengers}</p>
          <p><strong>Price Per Passenger:</strong> ${booking.price}</p>
          <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
          <p><strong>Created At:</strong> {booking.createdAt}</p>
        </div>

        <Link
          href="/search"
          className="mt-8 inline-block rounded-xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700"
        >
          Search More Flights
        </Link>
      </section>
    </main>
  );
}