import {useEffect, useState} from "react";
import {EventSummary} from "@/types/eventSummary.dto";
import {ActivityIndicator, FlatList, StyleSheet, Text} from "react-native";
import EventSummaryView from "@/components/EventSummaryView/EventSummaryView";
import {API_URL} from "@/config";
import {buildListWithHeaders} from "@/utils/buildListWithHeaders";


export default function EventSummaryList () {

    const [events, setEvents] = useState<EventSummary[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(`${API_URL}/events/`);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

    const fetchItems = async (url: string, replace = false): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setEvents(prev => (replace ? data.results : [...prev, ...data.results]));
            setNextPageUrl(data.next);
        } catch (err) {
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems(`${API_URL}/events/`, true);
    }, []);

    const handleLoadMore = () => {
        if (!loading && nextPageUrl) {
            fetchItems(nextPageUrl);
        }
    };

    const handleToggleExpand = (eventId: string) => {
        setExpandedEventId(prev =>
            prev === eventId ? null : eventId
        );
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchItems(`${API_URL}/events/`, true);
        setExpandedEventId(null);
        setRefreshing(false);
    };

    // if (loading) {
    //     return <ActivityIndicator size="large" style={{marginTop: 50}}/>;
    // }

    const itemsWithHeaders = buildListWithHeaders(events);

    return (
        <FlatList
            data={itemsWithHeaders}
            keyExtractor={(item) =>
                item.type === 'header' ? `header-${item.date}` : `event-${item.event.id.toString()}`
            }
            contentContainerStyle={styles.listContainer}
            renderItem={({item}) => {
                if (item.type === 'header') {
                    return (
                        <Text style={styles.dateHeader}>
                            {item.date}
                        </Text>
                    );
                } else {
                    return (
                        <EventSummaryView
                            eventData={item.event}
                            expanded={expandedEventId === item.event.id}
                            onToggleExpand={() => handleToggleExpand(item.event.id)}
                        />
                    );
                }
            }}
            ListEmptyComponent={<Text style={styles.emptyText}>No events found.</Text>}
            ListFooterComponent={loading && !refreshing ? <ActivityIndicator size="small" style={{ margin: 10 }} /> : null}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshing={refreshing}
            onRefresh={handleRefresh}
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
    dateHeader: {
        fontWeight: '600',
        marginBottom: 6,
        color: '#fff',
        fontFamily: 'Verdana, sans-serif',
    },
});