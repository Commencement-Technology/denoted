import { BookmarkPlus } from "@tamagui/lucide-icons";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { Tag } from "data/Tag";
import { useState } from "react";
import { Button, Input, XStack } from "tamagui";
import { TagSelector } from "./TagSelector";

export function SheetEditTags() {
  const { appState, setAppState } = useAppContext();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const note = appState.modal_state.note as Note;

  const createTag = () => {
    if (!name.length) return;
    const newTag: Tag = {
      note_ids: [],
      ...(color.length && { color }),
    };

    setAppState((prev) => {
      const state = prev;
      state.tags = { ...state.tags, [name]: newTag };
      return state;
    });
    setName("");
    setColor("");
  };

  const toggleNoteTag = (name, tag, toSelect) => {
    const newNote: Note = {
      ...note,
      tag_ids: toSelect
        ? [...(note?.tag_ids || []), name]
        : note.tag_ids?.filter((id) => id != name),
    };

    const newTag: Tag = {
      ...tag,
      note_ids: toSelect
        ? [...tag.note_ids, note.path]
        : tag.note_ids.filter((id) => id != note.path),
    };

    setAppState((prev) => {
      const state = prev;
      state.notes = state.notes.map((n) => (n.path == note.path ? newNote : n));
      state.tags[name] = newTag;
      state.modal_state.note = newNote;
      return state;
    });
  };

  return (
    <>
      <XStack gap="$4" alignItems="center">
        <Input
          flex={1}
          value={name}
          onChangeText={setName}
          placeholder="Tag name"
        />
        <Button onPress={createTag}>
          <BookmarkPlus />
        </Button>
      </XStack>
      <XStack>
        <Input
          flex={1}
          value={color}
          onChangeText={setColor}
          placeholder="Tag color"
        />
      </XStack>
      <TagSelector comparable={note?.tag_ids} onPress={toggleNoteTag} />
    </>
  );
}
