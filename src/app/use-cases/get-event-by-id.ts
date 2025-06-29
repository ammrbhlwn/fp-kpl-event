import { EventRepository } from "../../infrastructure/repositories/getEventFromDB"

export async function getEventByIdUseCase(
  repo: EventRepository,
  id: string
): Promise<Event> {
  return await repo.getEventById(id)
}
