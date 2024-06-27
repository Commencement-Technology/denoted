import { usePathname, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ButtonText, Main } from "tamagui.config";
import { Button, ScrollView, Section, YStack, ZStack } from "tamagui";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { NotePreview } from "./NotePreview";
import { FolderPreview } from "./FolderPreview";
import { Plus } from "@tamagui/lucide-icons";

export function ExplorePage() {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();

  const filtered: Map<string, Note> = appState.notes?.reduce((map, note) => {
    if (!note.path.startsWith(pathname)) return map;
    const nextSlash = note.path.indexOf("/", pathname.length + 1);
    const key = note.path.slice(
      pathname.length,
      nextSlash < 0 ? undefined : nextSlash
    );
    if (key.length < 1) return map;
    return map.set(key, note);
  }, new Map<string, Note>());

  console.log(pathname);
  console.log(appState);
  console.log(filtered);

  const createNote = () => {
    const newPath = `${pathname}/${appState.notes_count}.txt`;
    const newNote: Note = {
      path: newPath,
      body: "",
      tag_ids: [],
    };

    setAppState((prev) => ({
      ...prev,
      notes_count: prev.notes_count + 1,
      notes: [...prev.notes, newNote],
    }));

    router.push(newPath);
  };

  return (
    <Main>
      <ZStack flex={1}>
        <YStack fullscreen>
          <StatusBar />
          <ScrollView
            // horizontal
            // showsHorizontalScrollIndicator={false}
            px={40}
            contentContainerStyle={{ gap: 14, paddingTop: 14 }}
          >
            {[...filtered].map(([path, note]) => (
              <Section onPress={() => router.push(pathname + path)} key={path}>
                {path.endsWith(".txt") ? (
                  <NotePreview note={note} />
                ) : (
                  <FolderPreview note={note} />
                )}
              </Section>
            ))}
          </ScrollView>
        </YStack>
        <YStack fullscreen justifyContent="flex-end" alignItems="flex-end">
          <Button
            right={16}
            bottom={16}
            size="$6"
            circular
            onPress={createNote}
          >
            <Plus size="$3" />
          </Button>
        </YStack>
      </ZStack>
    </Main>
  );
}
