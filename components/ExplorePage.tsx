import { usePathname, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, ButtonText, Main } from "tamagui.config";
import { H2, ScrollView, Section } from "tamagui";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { NotePreview } from "./NotePreview";
import { FolderPreview } from "./FolderPreview";

export function ExplorePage() {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();

  const filtered: Map<string, Note> = appState.notes?.reduce(
    (map, note) =>
      note.path.startsWith(pathname)
        ? map.set(
            note.path.slice(
              pathname.length,
              note.path.indexOf("/", pathname.length + 1) + 1 || undefined
            ),
            note
          )
        : map,
    new Map<string, Note>()
  );

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
      <StatusBar />
      <H2 color="#000">{pathname}</H2>
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
      <Button onPress={createNote}>
        <ButtonText>Add Note</ButtonText>
      </Button>
    </Main>
  );
}
