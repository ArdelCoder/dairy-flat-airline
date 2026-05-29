"use client";

import {useEffect, useState} from "react";
import FlightCard from "../components/FlightCard";
import {generateFlights, Flight} from "../data/generateFlights";
import {routeRules} from "../data/routeRules";
import Navbar from "../components/Navbar";
import Image from "next/image";

type Booking = {
    flightNo: string;
    numberOfPassengers?: number;
};

export default function SearchPage() {
    const flights = generateFlights(12);

    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [results, setResults] = useState<Flight[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        async function loadBookings() {
            const response = await fetch("/api/bookings");

            if (!response.ok) {
                return;
            }

            const data = await response.json();
            setBookings(data);
        }

        loadBookings();
    }, []);

    function getSeatsBooked(flightNo: string) {
        return bookings
            .filter((booking) => booking.flightNo === flightNo)
            .reduce(
                (total, booking) => total + Number(booking.numberOfPassengers || 1),
                0
            );
    }

    function handleSearch() {
        const filteredFlights = flights.filter((flight) => {
            const destinationMatch = flight.destination
                .toLowerCase()
                .includes(destination.toLowerCase());

            const dateMatch =
                date === "" || flight.departureDate === date;

            return destinationMatch && dateMatch;
        });

        setResults(filteredFlights);
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
                            Search scheduled services
                        </p>

                        <h1 className="mt-4 text-5xl font-bold">
                            Flight Search
                        </h1>

                        <p className="mt-4 max-w-2xl text-lg text-slate-200">
                            Search future scheduled flights generated dynamically
                            from the Dairy Flat Airline timetable system.
                        </p>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-8 py-10">
                    <div className="rounded-2xl bg-white p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Search Flights
                        </h2>

                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            <input
                                type="text"
                                placeholder="Destination"
                                value={destination}
                                onChange={(event) =>
                                    setDestination(event.target.value)
                                }
                                className="rounded-xl border border-slate-300 p-4"
                            />

                            <input
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                className="rounded-xl border border-slate-300 p-4"
                            />

                            <button
                                onClick={handleSearch}
                                className="rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white hover:bg-blue-900"
                            >
                                Search Flights
                            </button>
                        </div>
                    </div>

                    <div className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Weekly Flight Timetable
                        </h2>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {routeRules.map((rule) => (
                                <div
                                    key={rule.routeCode}
                                    className="rounded-xl border border-slate-200 p-4"
                                >
                                    <p className="text-lg font-semibold text-slate-900">
                                        {rule.route}
                                    </p>

                                    <p className="mt-2 text-slate-700">
                                        {rule.operatingDays.join(", ")}
                                    </p>

                                    <p className="text-slate-600">
                                        Departure: {rule.departureTime}
                                    </p>

                                    <p className="text-slate-600">
                                        Aircraft: {rule.aircraft}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 space-y-6">
                        {results.length === 0 ? (
                            <div className="rounded-2xl bg-white p-8 shadow-lg">
                                <p className="text-slate-500">
                                    No flights currently displayed.
                                </p>
                            </div>
                        ) : (
                            results.map((flight) => (
                                <FlightCard
                                    key={flight.flightNo}
                                    flightNo={flight.flightNo}
                                    route={flight.route}
                                    aircraft={flight.aircraft}
                                    capacity={flight.capacity}
                                    seatsBooked={getSeatsBooked(flight.flightNo)}
                                    price={flight.price}
                                    departureDate={flight.departureDate}
                                    departureTime={flight.departureTime}
                                    arrivalTime={flight.arrivalTime}
                                />
                            ))
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}