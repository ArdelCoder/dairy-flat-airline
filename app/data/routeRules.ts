export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type RouteRule = {
  routeCode: string;
  origin: string;
  destination: string;
  route: string;
  aircraft: string;
  capacity: number;
  price: number;
  operatingDays: Weekday[];
  departureTime: string;
  arrivalTime: string;
};

export const routeRules: RouteRule[] = [
  {
    routeCode: "DF-SYD-OUT",
    origin: "Dairy Flat",
    destination: "Sydney",
    route: "Dairy Flat → Sydney",
    aircraft: "SyberJet SJ30i",
    capacity: 6,
    price: 1299,
    operatingDays: ["Friday"],
    departureTime: "10:00 NZT",
    arrivalTime: "11:30 AEST",
  },
  {
    routeCode: "DF-SYD-IN",
    origin: "Sydney",
    destination: "Dairy Flat",
    route: "Sydney → Dairy Flat",
    aircraft: "SyberJet SJ30i",
    capacity: 6,
    price: 1299,
    operatingDays: ["Sunday"],
    departureTime: "15:00 AEST",
    arrivalTime: "21:00 NZT",
  },
  {
    routeCode: "DF-ROT-AM-OUT",
    origin: "Dairy Flat",
    destination: "Rotorua",
    route: "Dairy Flat → Rotorua",
    aircraft: "Cirrus SF50",
    capacity: 4,
    price: 399,
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    departureTime: "07:30 NZT",
    arrivalTime: "08:20 NZT",
  },
  {
    routeCode: "DF-ROT-AM-IN",
    origin: "Rotorua",
    destination: "Dairy Flat",
    route: "Rotorua → Dairy Flat",
    aircraft: "Cirrus SF50",
    capacity: 4,
    price: 399,
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    departureTime: "09:00 NZT",
    arrivalTime: "10:00 NZT",
  },
  {
    routeCode: "DF-ROT-PM-OUT",
    origin: "Dairy Flat",
    destination: "Rotorua",
    route: "Dairy Flat → Rotorua",
    aircraft: "Cirrus SF50",
    capacity: 4,
    price: 399,
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    departureTime: "16:30 NZT",
    arrivalTime: "17:20 NZT",
  },
  {
    routeCode: "DF-ROT-PM-IN",
    origin: "Rotorua",
    destination: "Dairy Flat",
    route: "Rotorua → Dairy Flat",
    aircraft: "Cirrus SF50",
    capacity: 4,
    price: 399,
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    departureTime: "18:00 NZT",
    arrivalTime: "19:00 NZT",
  },
  {
    routeCode: "DF-GBI-OUT",
    origin: "Dairy Flat",
    destination: "Great Barrier Island",
    route: "Dairy Flat → Great Barrier Island",
    aircraft: "Cirrus SF50",
    capacity: 4,
    price: 299,
    operatingDays: ["Monday", "Wednesday", "Friday"],
    departureTime: "09:30 NZT",
    arrivalTime: "10:00 NZT",
  },
  {
    routeCode: "DF-GBI-IN",
    origin: "Great Barrier Island",
    destination: "Dairy Flat",
    route: "Great Barrier Island → Dairy Flat",
    aircraft: "Cirrus SF50",
    capacity: 4,
    price: 299,
    operatingDays: ["Tuesday", "Thursday", "Saturday"],
    departureTime: "09:30 NZT",
    arrivalTime: "10:00 NZT",
  },
  {
    routeCode: "DF-CHT-OUT",
    origin: "Dairy Flat",
    destination: "Chatham Islands",
    route: "Dairy Flat → Chatham Islands",
    aircraft: "HondaJet Elite",
    capacity: 5,
    price: 899,
    operatingDays: ["Tuesday", "Friday"],
    departureTime: "08:00 NZT",
    arrivalTime: "11:45 CHAST",
  },
  {
    routeCode: "DF-CHT-IN",
    origin: "Chatham Islands",
    destination: "Dairy Flat",
    route: "Chatham Islands → Dairy Flat",
    aircraft: "HondaJet Elite",
    capacity: 5,
    price: 899,
    operatingDays: ["Wednesday", "Saturday"],
    departureTime: "12:30 CHAST",
    arrivalTime: "15:30 NZT",
  },
  {
    routeCode: "DF-TKP-OUT",
    origin: "Dairy Flat",
    destination: "Lake Tekapo",
    route: "Dairy Flat → Lake Tekapo",
    aircraft: "HondaJet Elite",
    capacity: 5,
    price: 699,
    operatingDays: ["Monday"],
    departureTime: "10:00 NZT",
    arrivalTime: "12:20 NZT",
  },
  {
    routeCode: "DF-TKP-IN",
    origin: "Lake Tekapo",
    destination: "Dairy Flat",
    route: "Lake Tekapo → Dairy Flat",
    aircraft: "HondaJet Elite",
    capacity: 5,
    price: 699,
    operatingDays: ["Tuesday"],
    departureTime: "13:30 NZT",
    arrivalTime: "15:40 NZT",
  },
];