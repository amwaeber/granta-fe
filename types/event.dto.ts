import {EventSummary} from "@/types/eventSummary.dto";

export interface Event extends EventSummary{
    description?: string;
}