import { NextRequest, NextResponse } from "next/server";
import { CreateEvent } from "../../infrastructure/repositories/addEventToDB";

export async function createEventHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const event = await CreateEvent(body); 

    return NextResponse.json({
      success: true,
      message: "Event berhasil dibuat dengan tiket otomatis",
      data: event
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : "Failed to create event" 
    }, { status: 500 });
  }
}
