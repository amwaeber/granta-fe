import { EventSummary } from '@/types/eventSummary.dto';
import {dateFormatDDMMMYYYY} from "@/utils/dateFormatDDMMMYYYY";

export type ListItem =
  | { type: 'header'; date: string }
  | { type: 'event'; event: EventSummary }
  | { type: "permanentHeader" };

export function buildListWithHeaders(events: EventSummary[]): ListItem[] {

  const list: ListItem[] = [];
  let lastDate = '';

  for (const event of events) {
    const eventDate = dateFormatDDMMMYYYY(event?.startTime);

    if (eventDate !== lastDate) {
      list.push({
        type: 'header',
        date: eventDate,
      });
      lastDate = eventDate;
    }

    list.push({
      type: 'event',
      event,
    });
  }

  return list;
}
