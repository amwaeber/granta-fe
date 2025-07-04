import {useEffect, useMemo, useState} from "react";
import {EventSummary} from "@/types/eventSummary.dto";
import {Event} from "@/types/event.dto";
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import EventSummaryView from "@/components/EventSummaryView/EventSummaryView";
import EventDetailsModal from "@/components/EventDetailsModal/EventDetailsModal";
import {API_URL} from "@/config";
import {buildListWithHeaders} from "@/utils/buildListWithHeaders";
import Colors from "@/constants/colors";


export default function EventSummaryList () {

    const [events, setEvents] = useState<EventSummary[]>([]);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(`${API_URL}/events/`);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [eventModal, setEventModal] = useState<boolean>(false);
    const [selectedEventDetails, setSelectedEventDetails] = useState<Event>();

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

    const fetchEventDetails = async (eventId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/events/${eventId}/`);
            const data = await response.json();
            setSelectedEventDetails(data);
        } catch (err) {
            console.error('Error fetching event:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (!loading && nextPageUrl) {
            fetchItems(nextPageUrl);
        }
    };

    const handlePress = async (eventId: string) => {
        await fetchEventDetails(eventId); // wait for data
        setEventModal(true); // only open modal once data is loaded
    };

    const closeModal = () => {
        setEventModal(false);
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchItems(`${API_URL}/events/`, true);
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
        return {itemsWithHeaders: items, stickyHeaderIndices: indices};
    }, [events]);

    return (
        <View>
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
                            <View style={{ height: 1, backgroundColor: Colors.secondary }} />
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
                                    onPress={() => handlePress(item.event.id)}
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
            {eventModal && selectedEventDetails && (
                <EventDetailsModal
                    event={selectedEventDetails}
                    visible={eventModal}
                    onClose={closeModal}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: Colors.secondary,
        width: '100%',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        color: Colors.textPrimary,
        fontFamily: 'Verdana, sans-serif',
    },
    stickyHeaderContainer: {
        backgroundColor: Colors.secondary,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginBottom: 4,
        zIndex: 10,
    },
    dateHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        fontFamily: 'Verdana, sans-serif',
    },
    eventContainer: {
        // Safe wrapper View required for FlatList stickyHeaderIndices stability
    },
});