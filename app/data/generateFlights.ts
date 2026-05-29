// Imports the airline scheduling rules and the Weekday type
// from routeRules.ts
import { routeRules, Weekday } from "./routeRules";

/*
  Flight Type

  Defines the structure of a generated flight object.

  Difference between RouteRule and Flight:
  ---------------------------------------
  RouteRule:
    A repeating timetable rule
    Example:
      "Every Friday operate Dairy Flat → Sydney"

  Flight:
    One actual dated flight instance
    Example:
      DF-SYD-OUT-20260529
*/

// TypeScript object type definition
export type Flight = {
  // Unique generated flight identifier
  flightNo: string;

  // Links flight back to timetable rule
  routeCode: string;

  // Departure airport/location
  origin: string;

  // Arrival airport/location
  destination: string;

  // Human-readable route name
  route: string;

  // Assigned aircraft
  aircraft: string;

  // Maximum passenger seats
  capacity: number;

  // Price per passenger
  price: number;

  // Generated departure date
  departureDate: string;

  // Scheduled departure time
  departureTime: string;

  // Scheduled arrival time
  arrivalTime: string;
};

/*
  Weekday lookup array

  JavaScript Date.getDay() returns:
    0 = Sunday
    1 = Monday
    ...
    6 = Saturday

  This array converts numeric weekdays into names.

  Example:
    weekdays[5] -> "Friday"
*/
const weekdays: Weekday[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/*
  Formats a JavaScript Date into YYYY-MM-DD format.

  Example:
    2026-05-29

  Date References:
  ----------------
  JavaScript Date object:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

  toISOString():
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString

  ISO 8601 date standard:
  https://en.wikipedia.org/wiki/ISO_8601
*/
function formatDate(date: Date) {

  /*
    toISOString() example:
      2026-05-29T10:22:33.000Z

    split("T")[0] extracts:
      2026-05-29
  */
  return date.toISOString().split("T")[0];
}

/*
  Generates a unique flight number.

  Example:
    routeCode:
      DF-SYD-OUT

    date:
      2026-05-29

    Result:
      DF-SYD-OUT-20260529
*/
function makeFlightNo(routeCode: string, date: string) {

  /*
    replaceAll("-", "")
    removes dashes from date string.

    Example:
      2026-05-29
      ->
      20260529
  */
  return `${routeCode}-${date.replaceAll("-", "")}`;
}

/*
  Main flight generation engine.

  Purpose:
  --------
  Converts recurring timetable rules into
  actual future dated flights.

  Example:
    Route Rule:
      Every Friday Sydney service

    Generated Flight:
      DF-SYD-OUT-20260529

  numberOfWeeks:
    How many weeks ahead to generate flights.

  Default:
    12 weeks
*/
export function generateFlights(numberOfWeeks = 12): Flight[] {

  // Array where generated flights are stored
  const flights: Flight[] = [];

  /*
    Current system date/time.

    Example:
      Fri May 29 2026

    Date.now() and Date references:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
  */
  const today = new Date();

  /*
    Convert weeks into total number of days.

    Example:
      12 weeks × 7 days = 84 days
  */
  const numberOfDays = numberOfWeeks * 7;

  /*
    Loop through every future day.

    Example:
      today
      tomorrow
      next day
      etc...
  */
  for (let i = 0; i < numberOfDays; i++) {

    /*
      Create copy of today's date.

      Important:
      JavaScript Date objects are mutable.
      Creating a copy prevents modifying the original date.
    */
    const currentDate = new Date(today);

    /*
      Move date forward by i days.

      Examples:
        i = 0 -> today
        i = 1 -> tomorrow
        i = 2 -> two days later

      Date.setDate():
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate
    */
    currentDate.setDate(today.getDate() + i);

    /*
      getDay() returns weekday number:
        0-6

      Then lookup array converts:
        5 -> "Friday"

      getDay():
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
    */
    const weekday = weekdays[currentDate.getDay()];

    // Convert current date into YYYY-MM-DD format
    const departureDate = formatDate(currentDate);

    /*
      Loop through all timetable route rules.

      Example rules:
        DF-SYD-OUT
        DF-ROT-AM-OUT
        DF-GBI-IN
    */
    for (const rule of routeRules) {

      /*
        Check whether this route operates
        on the current weekday.

        Example:
          Current weekday:
            Friday

          Rule operating days:
            ["Friday"]

          Result:
            true

        Array.includes():
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
      */
      if (rule.operatingDays.includes(weekday)) {

        /*
          Generate a real scheduled flight instance
          and add it into flights array.
        */
        flights.push({

          // Generate unique dated flight number
          flightNo: makeFlightNo(rule.routeCode, departureDate),

          // Copy route information from timetable rule
          routeCode: rule.routeCode,
          origin: rule.origin,
          destination: rule.destination,
          route: rule.route,

          // Aircraft assignment
          aircraft: rule.aircraft,

          // Passenger seat limit
          capacity: rule.capacity,

          // Ticket price
          price: rule.price,

          // Generated departure date
          departureDate,

          // Scheduled times
          departureTime: rule.departureTime,
          arrivalTime: rule.arrivalTime,
        });
      }
    }
  }

  /*
    Return all generated flights.

    Output:
      Array of future scheduled flights.
  */
  return flights;
}
