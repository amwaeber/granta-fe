import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
      <Drawer>
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
  );
}
