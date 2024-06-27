import { BookmarkPlus } from "@tamagui/lucide-icons";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { Tag } from "data/Tag";
import { useState } from "react";
import { Button, H2, Input, ToggleGroup, XStack } from "tamagui";
import { ButtonText } from "tamagui.config";

export function ModifyTags() {
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

    setAppState((prev) => ({
      ...prev,
      tags: { ...prev.tags, [name]: newTag },
    }));

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

    setAppState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) => (n.path == note.path ? newNote : n)),
      tags: { ...prev.tags, [name]: newTag },
      modal_state: { ...prev.modal_state, note: newNote },
    }));
  };

  return (
    <>
      <XStack gap="$4" alignItems="center">
        <Input
          flex={1}
          value={name}
          onChangeText={setName}
          placeholder="Tag Name"
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
          placeholder="Tag Color"
        />
      </XStack>
      <H2>Tags</H2>
      <ToggleGroup
        type="multiple"
        size="$0.5"
        gap="$2"
        flexWrap="wrap"
        //  onValueChange={}
      >
        {Object.entries(appState.tags).map(([name, tag]) => {
          const isSelected = note?.tag_ids?.includes(name);

          return (
            <ToggleGroup.Item
              key={name}
              value={name}
              padding="$4"
              //@ts-ignore
              pressed={isSelected}
              {...(isSelected &&
                tag.color && {
                  borderWidth: 0,
                  backgroundColor: tag.color,
                })}
              onPress={() => toggleNoteTag(name, tag, !isSelected)}
            >
              <XStack>
                <ButtonText>{name}</ButtonText>
              </XStack>
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup>
    </>
  );
}
