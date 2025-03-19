import { EventStructure } from "../utils/eventStructure";

export interface ResEventsBody {
    status: number,
    message: string,
    events: EventStructure[],
    details: string
}
