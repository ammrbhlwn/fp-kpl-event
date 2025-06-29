import { NextRequest, NextResponse } from "next/server";
import { createTicket } from "../../infrastructure/repositories/addTicketToDB";

export async function createTicketHandler(req: NextRequest) {
    try {
        const body = await req.json();
        const ticket = await createTicket(body);
        
        return NextResponse.json({
            success: true,
            message: "Ticket berhasil dibuat",
            data: ticket
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return NextResponse.json({ 
            success: false,
            error: error instanceof Error ? error.message : "Failed to create ticket" 
        }, { status: 500 });
    }
} 