import { usePathname, router } from "expo-router";
import { Button, ButtonText, Container, Main } from "tamagui.config";
import { H4, Input, Label, XStack, YStack } from "tamagui";
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

  const is_archived = note.path.startsWith("/archived");

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

  const toggleArchive = () => {
    const newPath =
      (is_archived ? "/notes" : "/archived") +
      note.path.substring(note.path.indexOf("/", 1));
    const newNote = {
      ...note,
      path: newPath,
    };

    setAppState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) => (n.path == pathname ? newNote : n)),
    }));

    router.replace(newPath);
  };

  return (
    <Main>
      <Container>
        {/* <YStack padding="$3" minWidth={300} space="$4"> */}
        <XStack alignItems="center" gap="$4">
          <Label width={90} color="#0F0" htmlFor={pathname + "-title"}>
            Title
          </Label>
          <Input
            flex={1}
            id={pathname + "-title"}
            value={note.title || ""}
            onChangeText={(text) => updateNote("title", text)}
          />
        </XStack>
        {/* </YStack> */}
      </Container>
      <H4 color="#00F">{pathname}</H4>
      <Button onPress={toggleArchive}>
        <ButtonText>{is_archived ? "Unarchive" : "Archive"}</ButtonText>
      </Button>
    </Main>
  );
}
