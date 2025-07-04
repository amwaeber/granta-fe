import {Drawer} from 'expo-router/drawer';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View} from "react-native";
import AboutIcon from "@/assets/icons/info-circle.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import MapIcon from "@/assets/icons/geo-alt-fill.svg";
import LogoIcon from "@/assets/icons/logo_inverse.svg";
import Colors from "@/constants/colors";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <Drawer
                    screenOptions={{
                        headerRight: () => (
                            <View style={{marginRight: 16}}>
                                <LogoIcon width={48} height={48}/>
                            </View>
                        ),
                        headerStyle: {
                            backgroundColor: Colors.primary,
                            elevation: 0, // Remove Android shadow
                            shadowColor: 'transparent', // Remove iOS shadow
                        },
                        headerTitleStyle: {
                            color: Colors.white,
                        },
                        headerTitleAlign: 'left',
                        drawerContentContainerStyle: {
                            paddingHorizontal: 0,
                        },
                        headerStatusBarHeight: 0,
                        headerTintColor: Colors.white,
                        drawerActiveTintColor: Colors.primary,
                        drawerInactiveTintColor: Colors.textPrimary,
                        drawerItemStyle: {
                            borderRadius: 0,
                        },
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
        backgroundColor: Colors.primary,
    },
});
