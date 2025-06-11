import {StyleSheet, TouchableOpacity, Text, View} from "react-native";
import {EventSummary} from "@/types/eventSummary.dto";
import {dateFormatDDMMMYYYY} from "@/utils/dateFormatDDMMMYYYY";
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
                <Text style={styles.text}>{eventData?.summary}</Text>
                <Text style={styles.text}>{dateFormatDDMMMYYYY(eventData?.startTime)}</Text>
                <Text style={styles.text}>Start: {dateFormatHHMM(eventData?.startTime)}</Text>
                {eventData?.endTime && (
                    <Text style={styles.text}>End: {dateFormatHHMM(eventData.endTime)}</Text>
                )}
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
    text: {
        fontSize: 14,
        marginBottom: 6,
        color: '#333',
        fontFamily: 'Verdana, sans-serif',
    },
});
