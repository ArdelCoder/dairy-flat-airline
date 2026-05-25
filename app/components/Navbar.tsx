import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Dairy Flat Airline
        </Link>

        <div className="flex gap-4 text-sm font-medium">
          <Link href="/" className="hover:text-blue-700">
            Home
          </Link>

          <Link href="/search" className="hover:text-blue-700">
            Search Flights
          </Link>

          <Link href="/manage" className="hover:text-blue-700">
            Manage Booking
          </Link>
        </div>
      </div>
    </nav>
  );
}