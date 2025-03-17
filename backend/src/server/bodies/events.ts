import { EventStructure } from "../../util/events.js"

export interface ResEventsBody {
    status: number,
    message: string,
    events: EventStructure[],
    details: string
}
