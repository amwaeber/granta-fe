import {useEffect, useState} from "react";
import {EventSummary} from "@/types/eventSummary.dto";
import {ActivityIndicator, FlatList, StyleSheet} from "react-native";
import EventSummaryView from "@/components/EventSummaryView";


export default function EventSummaryList () {
    const [data, setData] = useState<EventSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching from backend
        setTimeout(() => {
            setData([{
                id: '11sh1w',
                summary: 'Party at Midsummer Common',
                date: '10/06/2025',
                startTime: '12:00:00',
                endTime: '16:00:00',
                location: 'Midsummer Common'
            },
            {
                id: 'agweg3',
                summary: 'Party at Jesus Green',
                date: '11/06/2025',
                startTime: '10:00:00',
                endTime: '13:00:00',
                location: 'Jesus Green'
            },
            {
                id: '11v23a',
                summary: 'Party at Coldham\'s Common',
                date: '12/06/2025',
                startTime: '11:00:00',
                endTime: '17:00:00',
                location: 'Coldham\'s Common'
            },
            {
                id: '11v232',
                summary: 'Party at Christ\'s Piece',
                date: '13/06/2025',
                startTime: '12:00:00',
                endTime: '23:00:00',
                location: 'Christ\'s Piece'
            },
            {
                id: '11v2ht',
                summary: 'Party at Parker\'s Piece',
                date: '14/06/2025',
                startTime: '11:30:00',
                endTime: '17:00:00',
                location: 'Parker\'s Piece'
            }]);
            setLoading(false);
        }, 1000); // Replace with real API call
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={{marginTop: 50}}/>;
    }

    // @ts-ignore
    return (
        <FlatList
            data={data}
            keyExtractor={(event) => event.id.toString()}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => <EventSummaryView eventData={item} />}
            ListEmptyComponent={<Text style={styles.emptyText}>No events found.</Text>}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
        width: '100%',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
        fontFamily: 'Verdana, sans-serif',
    },
});