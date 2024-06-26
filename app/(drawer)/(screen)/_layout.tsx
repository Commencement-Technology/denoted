import { DrawerToggleButton } from "@react-navigation/drawer";
import { useAppContext } from "app/AppContext";
import { ExploreHeader } from "components/ExploreHeader";
import { NoteHeader } from "components/NoteHeader";
import { Note } from "data/Note";
import { Stack, usePathname } from "expo-router";
import { useTheme } from "tamagui";

const Layout = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const isNote = pathname.endsWith(".txt");

  const { appState, setAppState } = useAppContext();

  let note: Note | undefined;

  if (isNote)
    note = appState.notes?.find((note) => note.path.startsWith(pathname));

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
                headerRight: () => <NoteHeader note={note} />,
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
