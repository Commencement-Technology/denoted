import { usePathname } from "expo-router";
import { Container, Main } from "tamagui.config";
import { H4, Input, Separator, TextArea, XStack } from "tamagui";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";

export function NotePage() {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();

  const note: Note | undefined = appState.notes?.find((note) =>
    note.path.startsWith(pathname)
  );

  if (!note) return <></>;

  const updateNote = (key, val) => {
    const newNote = {
      ...note,
      [key]: val,
    };

    setAppState((prev) => {
      const state = prev;
      state.notes = state.notes.map((n) => (n.path == pathname ? newNote : n));
      return state;
    });
  };

  return (
    <Main>
      <Container flex={1} paddingBottom="$10">
        <XStack>
          <Input
            backgroundColor="transparent"
            borderWidth={0}
            flex={1}
            fontSize="$8"
            value={note.title || ""}
            onChangeText={(text) => updateNote("title", text)}
            placeholder="Title"
            color="#6366F1"
            placeholderTextColor="#aaa"
          />
        </XStack>
        <Separator borderColor="#ccc" marginVertical={15} />
        <TextArea
          backgroundColor="transparent"
          borderWidth={0}
          color="#111"
          value={note.body || ""}
          onChangeText={(text) => updateNote("body", text)}
          padding={0}
          numberOfLines={9007199254740991}
          rows={9007199254740991}
        />
      </Container>
    </Main>
  );
}
