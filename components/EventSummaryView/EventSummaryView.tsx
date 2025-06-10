import {StyleSheet, TouchableOpacity, Text} from "react-native";
import {EventSummary} from "@/types/eventSummary.dto";
import { Event } from '@/types/event.dto';
import {dateFormatDDMMMYYYY} from "@/utils/dateFormatDDMMMYYYY";
import {dateFormatHHMM} from "@/utils/dateFormatHHMM";
import {useEffect, useState} from "react";
import {API_URL} from "@/config";

// type Props = {
//   eventData: EventSummary;
// };

export default function EventSummaryView ({
  eventData,
  expanded,
  onToggleExpand
}: {
  eventData: EventSummary;
  expanded: boolean;
  onToggleExpand: () => void;
}) {
    const [fullEvent, setFullEvent] = useState<Event | null>(null);

    useEffect(() => {
        if (expanded && !fullEvent) {
            // Fetch full event details on expand
            const fetchFullEvent = async () => {
                const response = await fetch(`${API_URL}/events/${eventData.id}/`);
                const data = await response.json();
                setFullEvent(data);
            };
            fetchFullEvent();
        }
    }, [expanded, eventData.id, fullEvent]);

    return (
        <TouchableOpacity onPress={onToggleExpand} style={styles.container}>
            <Text style={styles.text}>{eventData?.summary}</Text>
            <Text style={styles.text}>{dateFormatDDMMMYYYY(eventData?.startTime)}</Text>
            <Text style={styles.text}>Start: {dateFormatHHMM(eventData?.startTime)}</Text>
            {eventData?.endTime && (
                <Text style={styles.text}>End: {dateFormatHHMM(eventData.endTime)}</Text>
            )}
            <Text style={styles.text}>{eventData?.location}</Text>
            {expanded && fullEvent && (
                <>
                    <Text>{fullEvent.description}</Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        marginBottom: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        // borderRadius: 8,
        borderColor: '#bbb',

    },
    text: {
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
        fontFamily: 'Verdana, sans-serif',
    },
});
