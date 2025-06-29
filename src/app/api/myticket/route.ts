import { NextRequest } from 'next/server';
import { getMyTicketsHandler } from '../../use-cases/get-my-tickets';

export async function GET(req: NextRequest) {
  return getMyTicketsHandler(req);
} 