import {
  AlarmClock,
  ArchiveRestore,
  ArchiveX,
  Tag,
} from "@tamagui/lucide-icons";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { router, usePathname } from "expo-router";
import { Section, XStack } from "tamagui";
import { Button } from "tamagui.config";

export function NoteHeader({ note }: { note: Note | undefined }) {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();

  if (!note) return <Section></Section>;

  const is_archived = note && note.path.startsWith("/archived");

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
    <XStack gap="$2">
      <Button>
        <AlarmClock />
      </Button>
      <Button>
        <Tag />
      </Button>
      <Button onPress={toggleArchive}>
        {is_archived ? <ArchiveRestore /> : <ArchiveX />}
      </Button>
    </XStack>
  );
}
