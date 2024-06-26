import { colorTokens } from "@tamagui/themes";
import { Archive, StickyNote } from "@tamagui/lucide-icons";
import Drawer from "expo-router/drawer";

const Layout = () => {
  console.log("DRAWER");
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        // drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: { marginLeft: -20 },
      }}
    >
      <Drawer.Screen
        name="notes"
        options={{
          title: "Notes",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <StickyNote size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="archived"
        options={{
          title: "Archived",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Archive size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default Layout;
