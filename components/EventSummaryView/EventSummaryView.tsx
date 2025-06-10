import {Animated, StyleSheet, TouchableOpacity, Text} from "react-native";
import {EventSummary} from "@/types/eventSummary.dto";
import { Event } from '@/types/event.dto';
import {dateFormatDDMMMYYYY} from "@/utils/dateFormatDDMMMYYYY";
import {dateFormatHHMM} from "@/utils/dateFormatHHMM";
import {useEffect, useRef, useState} from "react";
import {API_URL} from "@/config";

interface props {
  eventData: EventSummary;
  expanded: boolean;
  onToggleExpand: () => void;
}
// type Props = {
//   eventData: EventSummary;
// };

export default function EventSummaryView ({
  eventData,
  expanded,
  onToggleExpand
}: props) {
    const [fullEvent, setFullEvent] = useState<Event | null>(null);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (expanded && !fullEvent) {
            const fetchFullEvent = async () => {
                try {
                    const response = await fetch(`${API_URL}/events/${eventData.id}/`);
                    const data = await response.json();
                    setFullEvent(data);
                } catch (err) {
                    console.error('Error fetching full event:', err);
                }
            };
            fetchFullEvent();
        }

        Animated.timing(animation, {
            toValue: expanded ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [expanded, eventData.id, fullEvent, animation]);

    const maxHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 250], // adjust max expanded height here
    });

    const opacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <Animated.View style={[styles.card, {maxHeight}]}>
            <TouchableOpacity onPress={onToggleExpand}>
                <Text style={styles.text}>{eventData?.summary}</Text>
                <Text style={styles.text}>{dateFormatDDMMMYYYY(eventData?.startTime)}</Text>
                <Text style={styles.text}>Start: {dateFormatHHMM(eventData?.startTime)}</Text>
                {eventData?.endTime && (
                    <Text style={styles.text}>End: {dateFormatHHMM(eventData.endTime)}</Text>
                )}
                <Text style={styles.text}>{eventData?.location}</Text>
            </TouchableOpacity>
            {fullEvent && (
                <Animated.View style={{opacity, marginTop: 10}}>
                    {fullEvent.description && <Text>{fullEvent.description}</Text>}
                </Animated.View>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        width: '100%',
        marginBottom: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#bbb',

    },
    text: {
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
        fontFamily: 'Verdana, sans-serif',
    },
});
