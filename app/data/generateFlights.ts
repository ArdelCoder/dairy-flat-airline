import { routeRules, Weekday } from "./routeRules";

export type Flight = {
  flightNo: string;
  routeCode: string;
  origin: string;
  destination: string;
  route: string;
  aircraft: string;
  capacity: number;
  price: number;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
};

const weekdays: Weekday[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function makeFlightNo(routeCode: string, date: string) {
  return `${routeCode}-${date.replaceAll("-", "")}`;
}

export function generateFlights(numberOfWeeks = 12): Flight[] {
  const flights: Flight[] = [];
  const today = new Date();

  const numberOfDays = numberOfWeeks * 7;

  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const weekday = weekdays[currentDate.getDay()];
    const departureDate = formatDate(currentDate);

    for (const rule of routeRules) {
      if (rule.operatingDays.includes(weekday)) {
        flights.push({
          flightNo: makeFlightNo(rule.routeCode, departureDate),
          routeCode: rule.routeCode,
          origin: rule.origin,
          destination: rule.destination,
          route: rule.route,
          aircraft: rule.aircraft,
          capacity: rule.capacity,
          price: rule.price,
          departureDate,
          departureTime: rule.departureTime,
          arrivalTime: rule.arrivalTime,
        });
      }
    }
  }

  return flights;
}
