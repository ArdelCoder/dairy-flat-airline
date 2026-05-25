import Link from "next/link";

type FlightCardProps = {
  flightNo: string;
  route: string;
  aircraft: string;
  price: number;
  capacity: number;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  seatsBooked: number;
};

export default function FlightCard(props: FlightCardProps) {
  const seatsRemaining = props.capacity - props.seatsBooked;

  const isFull = seatsRemaining <= 0;
  const isLowSeats = seatsRemaining > 0 && seatsRemaining <= 2;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-2xl">
      <div className="bg-gradient-to-r from-slate-950 to-blue-900 px-6 py-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-blue-200">
              Scheduled Service
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {props.route}
            </h2>

            <p className="mt-2 text-blue-100">
              Flight {props.flightNo}
            </p>
          </div>

          {isFull ? (
            <span className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold">
              FULLY BOOKED
            </span>
          ) : isLowSeats ? (
            <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-900">
              FEW SEATS LEFT
            </span>
          ) : (
            <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold">
              AVAILABLE
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-6 px-6 py-6 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Aircraft
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {props.aircraft}
          </p>

          <p className="mt-5 text-sm uppercase tracking-wide text-slate-500">
            Departure Date
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {props.departureDate}
          </p>

          <p className="mt-5 text-sm uppercase tracking-wide text-slate-500">
            Capacity
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {props.capacity} passengers
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Departure Time
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {props.departureTime}
          </p>

          <p className="mt-5 text-sm uppercase tracking-wide text-slate-500">
            Arrival Time
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {props.arrivalTime}
          </p>

          <p className="mt-5 text-sm uppercase tracking-wide text-slate-500">
            Remaining Seats
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {seatsRemaining}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-6 py-5">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Price Per Passenger
          </p>

          <p className="text-3xl font-bold text-slate-950">
            ${props.price}
          </p>
        </div>

        {isFull ? (
          <button
            disabled
            className="rounded-xl bg-slate-300 px-6 py-3 font-semibold text-slate-600"
          >
            Fully Booked
          </button>
        ) : (
          <Link
            href={`/book/${props.flightNo}`}
            className="rounded-xl bg-slate-950 px-6 py-3 font-semibold text-white hover:bg-blue-900"
          >
            Book Flight
          </Link>
        )}
      </div>
    </div>
  );
}