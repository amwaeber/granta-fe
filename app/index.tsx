import { View, StyleSheet, SafeAreaView } from "react-native";

import EventSummaryList from "@/components/EventSummaryList/EventSummaryList";

export default function Index() {
    return (
        <View style={styles.container}>
            <EventSummaryList/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003FFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        color: '#333',
        fontFamily: 'Verdana, sans-serif',
    },
})