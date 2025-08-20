import {Text, View, StyleSheet, Linking, TouchableOpacity, Image} from 'react-native';
import Colors from "@/constants/colors";

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Relax whilst sipping a coffee or cold beer whilst the little ones play and use up their energy,
                or cool the kids down on a warm day with splash pads! Anyone for freshly picked berries or pumpkins
                for carving? Want indoor play areas for pent-up energy on a rainy day? Your child only chills when
                watching animals? Then this map is for you!
            </Text>
            <TouchableOpacity
                onPress={() =>
                    Linking.openURL(
                        "https://www.google.com/maps/d/u/1/edit?mid=1hD8WSa06ehuNVq2LHfiIEdiAWXkZkgI&ll=52.40112467974306%2C0.21628551215429503&z=9"
                    )
                }
            >
                <Image
                    source={require("../assets/qr_codes/map.png")}
                    style={{width: 250, height: 250}}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    hyperlink: {
        fontSize: 18,
        color: Colors.primary,
        marginBottom: 6,
    },
});
