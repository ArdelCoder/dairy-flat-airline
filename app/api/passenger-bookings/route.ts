import { connectToDatabase } from "../../../lib/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim().toLowerCase();

  if (!email) {
    return Response.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const db = await connectToDatabase();

  const bookings = await db
    .collection("bookings")
    .find({ email })
    .sort({ createdAt: -1 })
    .toArray();

  return Response.json(bookings);
}