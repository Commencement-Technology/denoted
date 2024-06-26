import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";
import { useTheme } from "tamagui";

export const unsatable_settings = {
  initialRouteNamee: "index",
};

const Layout = () => {
  const theme = useTheme();
  console.log("TONOTES");
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.blue7.get(),
        },
        headerTintColor: theme.color.get(),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Notes",
          headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        }}
      />
      {/* <Stack.Screen
        name="movie/[id]"
        options={{
          title: "",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="tv/[id]"
        options={{
          title: "",
          headerBackTitle: "Back",
        }}
      /> */}
    </Stack>
  );
};

export default Layout;
