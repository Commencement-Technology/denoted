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

export function NoteHeader() {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();
  const [isOpenDateModal, setIsOpenDateModal] = useState(false);
  const note = appState.notes?.find((note) => note.path.startsWith(pathname));

  if (!note) return <Section></Section>;

  const is_archived = note && note.path.startsWith("/archived");

  const updateNote = (newNote) => {
    setAppState((prev) => {
      const state = { ...prev };
      state.notes = state.notes.map((n) => (n.path == pathname ? newNote : n));
      return state;
    });
  };

  const toggleArchive = () => {
    const newPath =
      (is_archived ? "/notes" : "/archived") +
      note.path.substring(note.path.indexOf("/", 1));
    const newNote: Note = {
      ...note,
      path: newPath,
    };

    updateNote(newNote);
    router.replace(newPath);
  };

  const updateNoteDeadline = (date) => {
    const newNote: Note = {
      ...note,
      deadline_at: date.getTime(),
    };

    updateNote(newNote);
    setIsOpenDateModal(false);
  };

  const openTagsModal = () => {
    setAppState((prev) => {
      const state = { ...prev };
      state.modal_state.open = true;
      state.modal_state.note = note;
      state.modal_state.type = "EDIT_TAGS";
      return state;
    });
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
