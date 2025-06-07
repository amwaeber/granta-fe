import {View, StyleSheet, Text} from "react-native";
import {EventSummary} from "@/types/eventSummary.dto";

type Props = {
  eventData: EventSummary;
};

export default function EventSummaryView ({ eventData }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{eventData?.summary}</Text>
            <Text style={styles.text}>{eventData?.date}</Text>
            <Text style={styles.text}>{eventData?.startTime}</Text>
            <Text style={styles.text}>{eventData?.endTime}</Text>
            <Text style={styles.text}>{eventData?.location}</Text>
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
