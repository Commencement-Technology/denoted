import { usePathname, router } from "expo-router";
import { Button, ButtonText, Container, Main } from "tamagui.config";
import { H4, Input, Label, Separator, TextArea, XStack, YStack } from "tamagui";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";

export function NotePage() {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();

  const note: Note | undefined = appState.notes?.find((note) =>
    note.path.startsWith(pathname)
  );

  if (!note)
    return (
      <Main>
        <H4 color="#00F">Note not found at {pathname}</H4>
      </Main>
    );

  const updateNote = (key, val) => {
    console.log(key, val);
    const newNote = {
      ...note,
      [key]: val,
    };

    setAppState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) => (n.path == pathname ? newNote : n)),
    }));
  };

  return (
    <Main>
      <Container>
        {/* <YStack padding="$3" minWidth={300} space="$4"> */}
        <XStack>
          <Input
            flex={1}
            value={note.title || ""}
            onChangeText={(text) => updateNote("title", text)}
            placeholder="Title"
          />
        </XStack>
        <Separator marginVertical={15} />
        <TextArea
          value={note.body || ""}
          onChangeText={(text) => updateNote("body", text)}
        />
        {/* </YStack> */}
      </Container>
    </Main>
  );
}
