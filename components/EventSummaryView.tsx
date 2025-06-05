import {useEffect, useState} from "react";
import {ActivityIndicator, View, StyleSheet, Text} from "react-native";
import {EventSummary} from "@/types/eventSummary.dto";


export default function EventSummaryView () {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<EventSummary>();

    useEffect(() => {
        // Simulate fetching from backend
        setTimeout(() => {
            setData({
                summary: 'Party at Midsummer Common',
                date: '10/06/2025',
                startTime: '12:00:00',
                endTime: '16:00:00',
                location: 'Midsummer Common'
            });
            setLoading(false);
        }, 1000); // Replace with real API call
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={{marginTop: 50}}/>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{data?.summary}</Text>
            <Text style={styles.text}>{data?.date}</Text>
            <Text style={styles.text}>{data?.startTime}</Text>
            <Text style={styles.text}>{data?.endTime}</Text>
            <Text style={styles.text}>{data?.location}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#bbb',

    },
    text: {
        fontWeight: '600',
        marginBottom: 6,
    },
});
