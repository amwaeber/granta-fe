import { View, StyleSheet, SafeAreaView } from "react-native";

import EventSummaryList from "@/components/EventSummaryList/EventSummaryList";

export default function Index() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1}}>
                <EventSummaryList/>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        color: '#fff',
        fontFamily: 'Verdana, sans-serif',
    },
    button: {
        fontSize: 20,
        fontFamily: 'Verdana, sans-serif',
        textDecorationLine: 'underline',
        color: '#fff',
    },
})