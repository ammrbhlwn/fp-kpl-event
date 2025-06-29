import { NextRequest } from "next/server";
import { createTicketHandler } from "../../use-cases/create-ticket";

export async function POST(req: NextRequest) {
  return createTicketHandler(req);
} 