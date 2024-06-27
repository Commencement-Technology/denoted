import { usePathname, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Main } from "tamagui.config";
import { Button, ScrollView, Section, YStack, ZStack } from "tamagui";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { NotePreview } from "./NotePreview";
import { FolderPreview } from "./FolderPreview";
import { Plus } from "@tamagui/lucide-icons";
import groupBy from "utils/groupBy";

type File = Note & { key: string; type: string };

export function ExplorePage() {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();

  const filterPopulate = appState.notes?.reduce((map, note) => {
    if (
      appState.modal_state.query &&
      !note.title?.includes(appState.modal_state.query) &&
      !note.body?.includes(appState.modal_state.query)
    )
      return map;

    if (!note.path.startsWith(pathname + "/")) return map;
    const nextSlash = note.path.indexOf("/", pathname.length + 1);
    const key = note.path.slice(
      pathname.length,
      nextSlash < 0 ? undefined : nextSlash
    );
    if (key.length < 1) return map;

    if (
      appState.modal_state.query_tags &&
      appState.modal_state.query_tags.length > 0
    ) {
      const tags = appState.modal_state.query_tags.toString();
      let flag = true;
      note.tag_ids?.forEach((tag) => {
        if (tags.includes(tag)) flag = false;
      });
      if (flag) return map;
    }

    return map.set(key, {
      ...note,
      key,
      type: key.endsWith(".txt") ? "NOTE" : "FOLDER",
    });
  }, new Map<string, File>());

  const groupedMap: Map<string, File[]> = groupBy(
    Array.from(filterPopulate.values()),
    "type"
  );

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
        <YStack fullscreen paddingBottom="$10">
          <StatusBar />
          <ScrollView
            px={40}
            contentContainerStyle={{ gap: 14, paddingTop: 14 }}
          >
            {groupedMap["FOLDER"] &&
              groupedMap["FOLDER"].map((file) => (
                <Section
                  onPress={() => router.push(pathname + file.key)}
                  key={file.key}
                >
                  <FolderPreview path={file.key} note={file} />
                </Section>
              ))}
            {groupedMap["NOTE"] &&
              groupedMap["NOTE"].map((file) => (
                <Section
                  onPress={() => router.push(pathname + file.key)}
                  key={file.key}
                >
                  <NotePreview path={file.key} note={file} />
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
