import { colorTokens } from "@tamagui/themes";
import Drawer from "expo-router/drawer";
import { SideBar } from "components/SideBar";

const Layout = () => {
  return (
    <Drawer
      drawerContent={() => <SideBar />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: { marginLeft: -20 },
      }}
    >
      <Drawer.Screen name="(screen)" />
    </Drawer>
  );
};

export default Layout;
