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
                            backgroundColor: '#84c2d4',
                        },
                        headerStatusBarHeight: 0,
                        headerTintColor: '#333',
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
        backgroundColor: '#84c2d4',
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 6,
    },
    note: {
        fontSize: 18,
        color: '#666',
        fontStyle: 'italic',
    },
});
