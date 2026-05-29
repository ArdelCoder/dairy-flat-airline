"use client";

import Link from "next/link";
import {use, useState} from "react";
import Navbar from "../../components/Navbar";
import {generateFlights} from "../../data/generateFlights";
import Image from "next/image";


type BookingPageProps = {
    params: Promise<{
        flightNo: string;
    }>;
};

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

export default function BookingPage({params}: BookingPageProps) {
    const {flightNo} = use(params);

    const flights = generateFlights(12);

    const [passengerName, setPassengerName] = useState("");
    const [email, setEmail] = useState("");
    const [numberOfPassengers, setNumberOfPassengers] = useState(1);
    const [booking, setBooking] = useState<Booking | null>(null);
    const [error, setError] = useState("");

    const flight = flights.find((flight) => flight.flightNo === flightNo);

    const totalPrice = flight
        ? flight.price * numberOfPassengers
        : 0;

    async function handleBooking() {
        setError("");

        if (!passengerName || !email) {
            setError("Please enter passenger name and email.");
            return;
        }

        if (!flight) {
            setError("Flight not found.");
            return;
        }

        const response = await fetch("/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                passengerName,
                email,
                flightNo: flight.flightNo,
                route: flight.route,
                departureDate: flight.departureDate,
                departureTime: flight.departureTime,
                arrivalTime: flight.arrivalTime,
                price: flight.price,
                capacity: flight.capacity,
                numberOfPassengers,
                totalPrice,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error || "Booking failed.");
            return;
        }

        setBooking(data);
    }

    if (!flight) {
        return (
            <>
                <Navbar/>

                <main className="min-h-screen bg-slate-100 px-8 py-20">
                    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-10 shadow-lg">
                        <h1 className="text-4xl font-bold text-slate-900">
                            Flight Not Found
                        </h1>

                        <Link
                            href="/search"
                            className="mt-8 inline-block rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white"
                        >
                            Back to Search
                        </Link>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar/>

            <main className="min-h-screen bg-slate-100">
                <section className="relative overflow-hidden px-8 py-20 text-white">
                    <Image
                        src="/images/banner.jpg"
                        alt="Private aircraft banner"
                        fill
                        priority
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-slate-950/70"/>

                    <div className="relative mx-auto max-w-6xl">
                        <p className="text-sm uppercase tracking-widest text-blue-200">
                            Booking Checkout
                        </p>

                        <h1 className="mt-4 text-5xl font-bold">
                            {flight.route}
                        </h1>

                        <p className="mt-4 text-xl text-slate-200">
                            Flight {flight.flightNo}
                        </p>
                    </div>
                </section>

                <section className="mx-auto grid max-w-6xl gap-8 px-8 py-10 md:grid-cols-2">
                    <div className="rounded-2xl bg-white p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Flight Details
                        </h2>

                        <div className="mt-8 space-y-5">
                            <div>
                                <p className="text-sm uppercase tracking-wide text-slate-500">
                                    Aircraft
                                </p>

                                <p className="text-xl font-semibold text-slate-900">
                                    {flight.aircraft}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wide text-slate-500">
                                    Departure Date
                                </p>

                                <p className="text-xl font-semibold text-slate-900">
                                    {flight.departureDate}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wide text-slate-500">
                                    Departure Time
                                </p>

                                <p className="text-xl font-semibold text-slate-900">
                                    {flight.departureTime}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wide text-slate-500">
                                    Arrival Time
                                </p>

                                <p className="text-xl font-semibold text-slate-900">
                                    {flight.arrivalTime}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wide text-slate-500">
                                    Aircraft Capacity
                                </p>

                                <p className="text-xl font-semibold text-slate-900">
                                    {flight.capacity} passengers
                                </p>
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wide text-slate-500">
                                    Price Per Passenger
                                </p>

                                <p className="text-4xl font-bold text-slate-950">
                                    ${flight.price}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Passenger Information
                        </h2>

                        <div className="mt-8 space-y-5">
                            <input
                                type="text"
                                placeholder="Passenger name"
                                value={passengerName}
                                onChange={(event) =>
                                    setPassengerName(event.target.value)
                                }
                                className="w-full rounded-xl border border-slate-300 p-4"
                            />

                            <input
                                type="email"
                                placeholder="Passenger email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                className="w-full rounded-xl border border-slate-300 p-4"
                            />

                            <div>
                                <p className="mb-2 text-sm uppercase tracking-wide text-slate-500">
                                    Number Of Passengers
                                </p>

                                <input
                                    type="number"
                                    min="1"
                                    max={flight.capacity}
                                    value={numberOfPassengers}
                                    onChange={(event) =>
                                        setNumberOfPassengers(
                                            Number(event.target.value)
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-300 p-4"
                                />
                            </div>

                            <div className="rounded-2xl bg-slate-100 p-6">
                                <p className="text-sm uppercase tracking-wide text-slate-500">
                                    Total Price
                                </p>

                                <p className="mt-2 text-5xl font-bold text-slate-950">
                                    ${totalPrice}
                                </p>
                            </div>

                            {error && (
                                <div className="rounded-xl bg-red-100 p-4 text-red-700">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleBooking}
                                className="w-full rounded-xl bg-slate-950 px-6 py-4 text-lg font-semibold text-white hover:bg-blue-900"
                            >
                                Confirm Booking
                            </button>
                        </div>

                        {booking && (
                            <div className="mt-8 rounded-2xl bg-green-100 p-6">
                                <h2 className="text-2xl font-bold text-green-900">
                                    Booking Confirmed
                                </h2>

                                <p className="mt-4 text-green-800">
                                    Reference: {booking.bookingReference}
                                </p>

                                <Link
                                    href={`/invoice/${booking.bookingReference}`}
                                    className="mt-6 inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
                                >
                                    View Invoice
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}