// Next.js Link component for internal navigation between pages.
// Docs: https://nextjs.org/docs/app/api-reference/components/link
import Link from "next/link";

// Next.js Image component for optimized image loading.
// Docs: https://nextjs.org/docs/app/api-reference/components/image
import Image from "next/image";

// Custom reusable components from your project.
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Static data array used to generate the destination cards.
// This avoids manually writing each card separately.
const destinations = [
  {
    title: "Sydney",
    image: "/images/sydney.jpg",
    aircraft: "SyberJet SJ30i",
    text: "Weekly prestige service using the SyberJet SJ30i.",
  },
  {
    title: "Rotorua",
    image: "/images/rotorua.jpg",
    aircraft: "Cirrus SF50",
    text: "Weekday shuttle services using the Cirrus SF50.",
  },
  {
    title: "Great Barrier Island",
    image: "/images/great-barrier.jpg",
    aircraft: "Cirrus SF50",
    text: "Scenic island services three times weekly.",
  },
  {
    title: "Chatham Islands",
    image: "/images/chatham.jpg",
    aircraft: "HondaJet Elite",
    text: "Specialist long-range regional service.",
  },
  {
    title: "Lake Tekapo",
    image: "/images/tekapo.jpg",
    aircraft: "HondaJet Elite",
    text: "Weekly South Island scenic service.",
  },
];

// Default exported React component.
// In Next.js App Router, app/page.tsx becomes the homepage route "/".
export default function Home() {
  return (
    // React Fragment lets us return multiple top-level elements
    // without adding an unnecessary wrapper div.
    <>
      <Navbar />

      {/* Main page content. <main> is a semantic HTML element. */}
      <main className="min-h-screen bg-slate-100">

        {/* Hero/banner section */}
        <section className="relative overflow-hidden px-8 py-28 text-white">

          {/* Background image for the hero area.
              fill makes the image cover its parent container.
              priority tells Next.js this image should load early. */}
          <Image
            src="/images/banner.jpg"
            alt="Private aircraft banner"
            fill
            priority
            className="object-cover"
          />

          {/* Dark overlay placed over the image to improve text readability. */}
          <div className="absolute inset-0 bg-slate-950/70" />

          {/* Hero content wrapper. relative keeps this content above the overlay. */}
          <div className="relative mx-auto max-w-7xl">
            <p className="text-sm uppercase tracking-widest text-blue-200">
              Private regional air travel from Dairy Flat
            </p>

            <h1 className="mt-4 max-w-3xl text-6xl font-bold">
              Dairy Flat Airline
            </h1>

            <p className="mt-6 max-w-2xl text-xl text-slate-200">
              Luxury point-to-point services to Sydney, Rotorua, Great Barrier
              Island, the Chatham Islands, and Lake Tekapo.
            </p>

            {/* Navigation buttons using Next.js Link */}
            <div className="mt-10 flex gap-4">
              <Link
                href="/search"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-200"
              >
                Search Flights
              </Link>

              <Link
                href="/manage"
                className="rounded-xl border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-slate-950"
              >
                Manage Booking
              </Link>
            </div>
          </div>
        </section>

        {/* Destinations content section */}
        <section className="mx-auto max-w-7xl px-8 py-12">
          <h2 className="text-4xl font-bold text-slate-900">
            Destinations
          </h2>

          {/* Responsive grid layout.
              md:grid-cols-3 means three columns on medium screens and larger. */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">

            {/* map() loops through the destinations array and creates one card per item. */}
            {destinations.map((destination) => (
              <div
                key={destination.title}
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48">
                  <Image
                    src={destination.image}
                    alt={destination.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {destination.title}
                  </h3>

                  <p className="mt-3 text-slate-600">
                    {destination.text}
                  </p>

                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Aircraft: {destination.aircraft}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}