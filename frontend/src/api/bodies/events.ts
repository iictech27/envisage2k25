import { EventStructure } from "../utils/eventStructure";

// response bodies

export interface ResEventsBody {
  status: number;
  message: string;
  events: EventStructure[];
  details: string;
}
