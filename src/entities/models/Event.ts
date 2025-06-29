import { EventType } from "../valueObject/EventType";

export interface Event {
    id: number;
    name: string;
    location: string;
    date: Date;
    time: string;
    types: EventType;
    capacity: number;
    description: string;
}