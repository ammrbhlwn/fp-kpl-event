import { NextRequest } from "next/server";
import { createEventHandler } from "../../use-cases/create-event";

export async function POST(req: NextRequest) {
  return createEventHandler(req);
}
