import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Link } from "expo-router";

import EventSummaryList from "@/components/EventSummaryList";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Home screen
            </Text>
            <SafeAreaView style={{flex: 1}}>
                <EventSummaryList/>
            </SafeAreaView>
            <Link href="/about" style={styles.button}>
                Go to about screen
            </Link>
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