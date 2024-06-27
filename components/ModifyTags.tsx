import { ListPlus } from "@tamagui/lucide-icons";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { Tag } from "data/Tag";
import { usePathname } from "expo-router";
import { useState } from "react";
import { Button, Input, SizeTokens, Text, ToggleGroup, XStack } from "tamagui";
import { ButtonText, Title } from "tamagui.config";

export function ModifyTags({
  setOpen,
  note,
}: {
  setOpen: (value: boolean) => void;
  note?: Note;
}) {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  console.log(appState.tags);

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
          <ListPlus />
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
      <Title>Tags</Title>
      <ToggleGroup orientation="vertical" type="multiple" size="$0.5" gap="$2">
        {Object.entries(appState.tags).map(([name, tag]) => (
          <ToggleGroup.Item
            key={name}
            value={name}
            {...(tag.color && { backgroundColor: tag.color })}
            borderWidth={0}
          >
            <XStack>
              <Button
                borderRadius="$8"
                {...(tag.color && { backgroundColor: tag.color })}
              >
                <ButtonText>{name}</ButtonText>
              </Button>
            </XStack>
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
    </>
  );
}
