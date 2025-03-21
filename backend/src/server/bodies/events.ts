import { EventStructure } from "../../util/events.js"

// response bodies

export interface ResEventsBody {
    status: number,
    message: string,
    events: EventStructure[],
    details: string
}
