import { DrawerToggleButton } from "@react-navigation/drawer";
import { ExploreHeader } from "components/ExploreHeader";
import { NoteHeader } from "components/NoteHeader";
import { Stack, usePathname } from "expo-router";
import { useTheme } from "tamagui";

const Layout = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const isNote = pathname.endsWith(".txt");

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
        name="[...page]"
        options={{
          ...(isNote
            ? {
                title: "",
                headerBackTitle: "Back",
                headerRight: () => <NoteHeader />,
              }
            : {
                title: pathname.startsWith("/notes") ? "Notes" : "Archived",
                headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
                headerRight: () => <ExploreHeader />,
              }),
        }}
      />
    </Stack>
  );
};

export default Layout;
