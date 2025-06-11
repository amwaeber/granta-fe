import {StyleSheet, TouchableOpacity, Text, View} from "react-native";
import {EventSummary} from "@/types/eventSummary.dto";
import {dateFormatDDMonthYYYY} from "@/utils/dateFormatDDMonthYYYY";
import {dateFormatHHMM} from "@/utils/dateFormatHHMM";

interface props {
  eventData: EventSummary;
  onPress: () => void;
}

export default function EventSummaryView ({
  eventData,
  onPress
}: props) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.title}>{eventData?.summary}</Text>
                <Text style={styles.date}>{dateFormatDDMonthYYYY(eventData?.startTime)}</Text>
                <View style={styles.timeRow}>
                    <Text style={styles.time}>Start: {dateFormatHHMM(eventData?.startTime)}</Text>
                    {eventData?.endTime && (
                        <Text style={styles.time}>End: {dateFormatHHMM(eventData.endTime)}</Text>
                    )}
                </View>
                <Text style={styles.text}>{eventData?.location}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        marginBottom: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#bbb',

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#666',
    },
    date: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#999',
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    time: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#666',
    },
    text: {
        fontSize: 14,
        marginBottom: 6,
        color: '#333',
        fontFamily: 'Verdana, sans-serif',
    },
});
