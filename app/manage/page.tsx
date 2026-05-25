"use client";

import { useState } from "react";
import Link from "next/link";

type Booking = {
  bookingReference: string;
  passengerName: string;
  email: string;
  flightNo: string;
  route: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  numberOfPassengers: number;
  totalPrice: number;
  createdAt: string;
};

export default function ManagePage() {
  const [bookingReference, setBookingReference] = useState("");
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [passengerBookings, setPassengerBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState("");

  async function findBooking() {
    setMessage("");
    setBooking(null);

    const response = await fetch(`/api/bookings/${bookingReference}`);

    if (!response.ok) {
      setMessage("Booking not found.");
      return;
    }

    const data = await response.json();
    setBooking(data);
  }

  async function findPassengerBookings() {
    setMessage("");
    setPassengerBookings([]);

    const response = await fetch(
      `/api/passenger-bookings?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      setMessage("Could not fetch passenger bookings.");
      return;
    }

    const data = await response.json();
    setPassengerBookings(data);
  }

  async function cancelBooking(reference: string) {
    const response = await fetch(`/api/bookings/${reference}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setMessage("Could not cancel booking.");
      return;
    }

    setBooking(null);
    setPassengerBookings((currentBookings) =>
      currentBookings.filter(
        (booking) => booking.bookingReference !== reference
      )
    );
    setMessage("Booking cancelled successfully.");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <section className="mx-auto max-w-5xl rounded-2xl bg-white p-10 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-slate-900">
            Manage Booking
          </h1>

          <Link
            href="/"
            className="rounded-xl border border-slate-300 px-5 py-2 hover:bg-slate-100"
          >
            Home
          </Link>
        </div>

        <div className="mt-8 rounded-xl border border-slate-300 p-5">
          <h2 className="text-2xl font-semibold">
            Find Booking by Reference
          </h2>

          <div className="mt-4 flex gap-4">
            <input
              type="text"
              placeholder="Example: DF-123456"
              value={bookingReference}
              onChange={(event) => setBookingReference(event.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <button
              onClick={findBooking}
              className="rounded-xl bg-slate-900 px-6 py-3 text-white hover:bg-slate-700"
            >
              Find
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-300 p-5">
          <h2 className="text-2xl font-semibold">
            Find Passenger Bookings
          </h2>

          <div className="mt-4 flex gap-4">
            <input
              type="email"
              placeholder="Passenger email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <button
              onClick={findPassengerBookings}
              className="rounded-xl bg-slate-900 px-6 py-3 text-white hover:bg-slate-700"
            >
              Search
            </button>
          </div>
        </div>

        {message && (
          <p className="mt-6 rounded-xl bg-slate-50 p-4 text-slate-700">
            {message}
          </p>
        )}

        {booking && (
          <BookingBox booking={booking} cancelBooking={cancelBooking} />
        )}

        {passengerBookings.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold">
              Passenger Bookings
            </h2>

            {passengerBookings.map((booking) => (
              <BookingBox
                key={booking.bookingReference}
                booking={booking}
                cancelBooking={cancelBooking}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function BookingBox({
  booking,
  cancelBooking,
}: {
  booking: Booking;
  cancelBooking: (reference: string) => void;
}) {
  return (
    <div className="mt-8 rounded-xl border border-slate-300 p-5">
      <h2 className="text-2xl font-semibold">Booking</h2>

      <p><strong>Reference:</strong> {booking.bookingReference}</p>
      <p><strong>Passenger:</strong> {booking.passengerName}</p>
      <p><strong>Email:</strong> {booking.email}</p>
      <p><strong>Flight:</strong> {booking.flightNo}</p>
      <p><strong>Route:</strong> {booking.route}</p>
      <p><strong>Departure:</strong> {booking.departureDate} {booking.departureTime}</p>
      <p><strong>Passengers:</strong> {booking.numberOfPassengers}</p>
      <p><strong>Total Price:</strong> ${booking.totalPrice}</p>

      <button
        onClick={() => cancelBooking(booking.bookingReference)}
        className="mt-5 rounded-xl bg-red-700 px-6 py-3 text-white hover:bg-red-800"
      >
        Cancel Booking
      </button>
    </div>
  );
}