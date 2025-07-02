import {Drawer} from 'expo-router/drawer';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from "react-native";
import AboutIcon from "@/assets/icons/info-circle.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import MapIcon from "@/assets/icons/geo-alt-fill.svg";
import LogoIcon from "@/assets/icons/logo_inverse.svg";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <Drawer
                    screenOptions={{
                        headerRight: () => (
                            <LogoIcon width="48" height="48" marginRight="16" />
                        ),
                        headerStyle: {
                            backgroundColor: '#4C6DFF',
                            elevation: 0, // Remove Android shadow
                            shadowColor: 'transparent', // Remove iOS shadow
                        },
                        headerTitleStyle: {
                            color: '#fff',
                        },
                        headerTitleAlign: 'left',
                        drawerContentContainerStyle: {
                            paddingHorizontal: 0,
                        },
                        headerStatusBarHeight: 0,
                        headerTintColor: '#fff',
                        drawerActiveTintColor: '#4C6DFF',
                        drawerInactiveTintColor: '#333',
                        drawerItemStyle: {
                            borderRadius: 0,
                        },
                        // drawerStyle: {
                        //     width: '70%',
                        // },
                        drawerLabelStyle: {
                            fontSize: 18,
                            fontFamily: 'Verdana, sans-serif',
                        },
                    }}
                >
                    <Drawer.Screen
                        name="index"
                        options={{
                            drawerLabel: 'Events',
                            title: 'Events',
                            drawerIcon: ({color, size}) => (
                                <CalendarIcon width={size} height={size} color={color}/>
                            )
                        }}
                    />
                    <Drawer.Screen
                        name="about"
                        options={{
                            drawerLabel: 'About',
                            title: 'About',
                            drawerIcon: ({color, size}) => (
                                <AboutIcon width={size} height={size} color={color}/>
                            )
                        }}
                    />
                    <Drawer.Screen
                        name="map"
                        options={{
                            drawerLabel: 'Map',
                            title: 'Map',
                            drawerIcon: ({color, size}) => (
                                <MapIcon width={size} height={size} color={color}/>
                            )
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
        backgroundColor: '#4C6DFF',
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
