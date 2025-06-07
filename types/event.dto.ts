import {EventSummary} from "@/types/eventSummary.dto";

export interface Event extends EventSummary{
    google_event_id: string;
    recurring_event_id: string;
    last_updated: string;
    description?: string;
}