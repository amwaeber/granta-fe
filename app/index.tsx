import { View, StyleSheet, SafeAreaView } from "react-native";

import EventSummaryList from "@/components/EventSummaryList/EventSummaryList";
import Colors from "@/constants/colors";

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
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        color: Colors.textPrimary,
        fontFamily: 'Verdana, sans-serif',
    },
})