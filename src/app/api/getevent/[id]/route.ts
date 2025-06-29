import { NextRequest, NextResponse } from "next/server"
import { getEventByIdUseCase } from "../../../use-cases/get-event-by-id"
import { eventRepository } from "../../../../infrastructure/repositories/getEventFromDB"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const event = await getEventByIdUseCase(eventRepository, id)

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json({ data: event }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    )
  }
}
