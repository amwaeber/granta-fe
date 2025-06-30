import {Text, View, StyleSheet, Linking} from 'react-native';

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Relax whilst sipping a coffee or cold beer whilst the little ones play and use up their energy,
                or cool the kids down on a warm day with splash pads! Anyone for freshly picked berries or pumpkins
                for carving? Want indoor play areas for pent-up energy on a rainy day? Your child only chills when
                watching animals? Then this map is for you!
            </Text>
            <Text style={styles.hyperlink} onPress={() => Linking.openURL(
                'https://www.google.com/maps/d/u/1/edit?mid=1hD8WSa06ehuNVq2LHfiIEdiAWXkZkgI&ll=52.40112467974306%2C0.21628551215429503&z=9'
            )}>
                Link to Google Map.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 6,
    },
    hyperlink: {
        fontSize: 18,
        color: '#003FFF',
        marginBottom: 6,
    },
    note: {
        fontSize: 18,
        color: '#666',
        fontStyle: 'italic',
    },
});
