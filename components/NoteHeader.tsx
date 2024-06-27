import {
  ArchiveRestore,
  ArchiveX,
  CalendarClock,
  CalendarPlus,
  Tag,
} from "@tamagui/lucide-icons";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { Section, XStack } from "tamagui";
import { Button } from "tamagui.config";
import DateTimePicker from "./DateTimePicker";

export function NoteHeader({ note }: { note: Note | undefined }) {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();
  const [isOpenDateModal, setIsOpenDateModal] = useState(false);

  if (!note) return <Section></Section>;

  const is_archived = note && note.path.startsWith("/archived");

  const toggleArchive = () => {
    const newPath =
      (is_archived ? "/notes" : "/archived") +
      note.path.substring(note.path.indexOf("/", 1));
    const newNote: Note = {
      ...note,
      path: newPath,
    };

    setAppState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) => (n.path == pathname ? newNote : n)),
    }));

    router.replace(newPath);
  };

  const updateNoteDeadline = (date) => {
    const newNote: Note = {
      ...note,
      deadline_at: date.getTime(),
    };

    setAppState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) => (n.path == pathname ? newNote : n)),
    }));
    setIsOpenDateModal(false);
  };

  const openTagsModal = () => {
    setAppState((prev) => ({
      ...prev,
      modal_state: {
        open: true,
        note: note,
        type: "TAGS",
      },
    }));
  };

  return (
    <>
      <XStack gap="$2">
        <Button onPress={() => setIsOpenDateModal(true)}>
          {note.deadline_at ? <CalendarClock /> : <CalendarPlus />}
        </Button>
        <Button onPress={openTagsModal}>
          <Tag />
        </Button>
        <Button onPress={toggleArchive}>
          {is_archived ? <ArchiveRestore /> : <ArchiveX />}
        </Button>
      </XStack>
      {isOpenDateModal && (
        <DateTimePicker
          type="date"
          date={note.deadline_at ? new Date(note.deadline_at) : new Date()}
          onCancel={() => setIsOpenDateModal(false)}
          onConfirm={updateNoteDeadline}
        />
      )}
    </>
  );
}
