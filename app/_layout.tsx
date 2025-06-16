import {Drawer} from 'expo-router/drawer';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from "react-native";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <Drawer
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#003FFF',
                            elevation: 0, // Remove Android shadow
                            shadowColor: 'transparent', // Remove iOS shadow
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerStatusBarHeight: 0,
                        headerTintColor: '#fff',
                        drawerActiveTintColor: '#62a0b2',
                        drawerInactiveTintColor: '#333',
                        drawerItemStyle: {
                            borderRadius: 0, // ✅ remove rounded corners
                        },
                    }}
                >
                    <Drawer.Screen
                        name="index"
                        options={{
                            drawerLabel: 'Events',
                            title: 'Events',
                        }}
                    />
                    <Drawer.Screen
                        name="about"
                        options={{
                            drawerLabel: 'About',
                            title: 'About',
                        }}
                    />
                </Drawer>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#003FFF',
    },
    text: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 6,
    },
    note: {
        fontSize: 18,
        color: '#666',
        fontStyle: 'italic',
    },
});
