import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from "react-native";
import {EventSummary} from "@/types/eventSummary.dto";
import {
    dateFormatDDMonthYYYY,
    dateFormatHHMM
} from "@/utils/dateFormats";
import Colors from "@/constants/colors";

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
        padding: 16,
        marginBottom: 4,
        marginLeft: 4,
        marginRight: 4,
        backgroundColor: Colors.white,
        borderRadius: 12,

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Colors.textTertiary,
    },
    date: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        color: Colors.textSecondary,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    time: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        color: Colors.textTertiary,
    },
    text: {
        fontSize: 14,
        marginBottom: 6,
        color: Colors.textPrimary,
        fontFamily: 'Verdana, sans-serif',
    },
});
