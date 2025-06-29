import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../supabase/server";
import { bookTicketUseCase } from "../../use-cases/book-ticket";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
    const newTicket = await bookTicketUseCase({
      ...body,
      userId: user.id,
    })
    return NextResponse.json({ data: newTicket }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
} 