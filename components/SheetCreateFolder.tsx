import { FolderPlus } from "@tamagui/lucide-icons";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { Input, XStack } from "tamagui";
import { Button } from "tamagui.config";

export function SheetCreateFolder() {
  const pathname = usePathname();
  const { setAppState } = useAppContext();
  const [value, setValue] = useState("");

  const createFolder = () => {
    const newPath = `${pathname}/${value}`;
    const newNote: Note = {
      path: newPath,
    };

    setAppState((prev) => {
      const state = prev;
      state.notes = [...state.notes, newNote];
      state.modal_state.open = false;
      return state;
    });
    router.push(newPath);
  };

  return (
    <>
      <XStack gap="$4" alignItems="center">
        <Input
          flex={1}
          value={value}
          onChangeText={setValue}
          placeholder="Folder name"
        />
        <Button onPress={createFolder}>
          <FolderPlus />
        </Button>
      </XStack>
    </>
  );
}
