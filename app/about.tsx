import {Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Image} from 'react-native';
import Colors from "@/constants/colors";

export default function AboutScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>
                We’re a small group of local volunteers, passionate about sharing useful tips and local knowledge with
                fellow parents and carers. We also love supporting the work of local organisations - museums, charities,
                and councils - by helping promote the fantastic events they’re putting together for the children.
            </Text>
            <Text style={styles.text}>
                Our recommendations come from chatting with other parents at the school gate, staying in the loop with
                what’s happening around Cambridge, and trying things out with our own kids.
            </Text>
            <Text style={styles.text}>
                Have a look at our website for the online version:
            </Text>
            <TouchableOpacity
                onPress={() =>
                    Linking.openURL(
                        "https://sites.google.com/view/cambridgefamilyevents"
                    )
                }
            >
                <Image
                    source={require("../assets/qr_codes/website.png")}
                    style={{width: 250, height: 250, alignSelf: "center"}}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={styles.note}>
                We don’t receive financial contributions from the organisations we feature. While we do our best to
                highlight quality events and resources, not everything has been personally tested by us. We do our
                best to share accurate and up-to-date information, but details can change, so we always recommend
                visiting the organiser’s website before attending an event to check for updates or last-minute
                cancellations.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.white,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: Colors.textPrimary,
        marginBottom: 6,
    },
    note: {
        fontSize: 18,
        color: Colors.textTertiary,
        fontStyle: 'italic',
    },
});
