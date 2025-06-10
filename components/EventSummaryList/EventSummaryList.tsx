import {useEffect, useMemo, useState} from "react";
import {EventSummary} from "@/types/eventSummary.dto";
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
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

    const {itemsWithHeaders, stickyHeaderIndices} = useMemo(() => {
        const baseItems = buildListWithHeaders(events);
        const items = [
            { type: "permanentHeader" as const },
            ...baseItems
        ];
        const indices = [0, ...items
            .map((item, index) => (item.type === "header" ? index : null))
            .filter((index): index is number => index !== null)];
        console.log(indices);
        return {itemsWithHeaders: items, stickyHeaderIndices: indices};
    }, [events]);

    return (
        <FlatList
            data={itemsWithHeaders}
            keyExtractor={(item) => {
                if (item.type === "permanentHeader") return "sticky-invisible";
                if (item.type === "header") return `header-${item.date}`;
                if (item.type === "event") return `event-${item.event.id}`;
                return "empty";
            }}
            contentContainerStyle={styles.listContainer}
            stickyHeaderIndices={stickyHeaderIndices}
            renderItem={({item}) => {
                if (item.type === "permanentHeader") { // workaround for stickyHeader on Android
                    return (
                        <View style={{ height: 1 }} />
                    );
                } else if (item.type === 'header') {
                    return (
                        <View style={styles.stickyHeaderContainer}>
                            <Text style={styles.dateHeader}>
                                {item.date}
                            </Text>
                        </View>
                    );
                } else {
                    return (
                        <View style={styles.eventContainer}>
                            <EventSummaryView
                                eventData={item.event}
                                expanded={expandedEventId === item.event.id}
                                onToggleExpand={() => handleToggleExpand(item.event.id)}
                            />
                        </View>
                    );
                }
            }}
            ListEmptyComponent={<Text style={styles.emptyText}>No events found.</Text>}
            ListFooterComponent={
                loading && !refreshing ? <ActivityIndicator size="small" style={{margin: 10}}/> : null
            }
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
    stickyHeaderContainer: {
        backgroundColor: '#555',
        paddingVertical: 6,
        paddingHorizontal: 10,
        zIndex: 10,
    },
    dateHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Verdana, sans-serif',
    },
    eventContainer: {
        // Safe wrapper View required for FlatList stickyHeaderIndices stability
    },
});