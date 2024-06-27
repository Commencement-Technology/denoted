import { FolderPlus } from "@tamagui/lucide-icons";
import { Sheet } from "@tamagui/sheet";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { router, usePathname } from "expo-router";
import { useState } from "react";

import { H1, H2, Input, Paragraph, XStack, YStack } from "tamagui";
import { Button } from "tamagui.config";

export const SheetModal = ({ open, setOpen }) => {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();
  const [position, setPosition] = useState(0);
  const [value, setValue] = useState("");
  const snapPoints = [85, 50, 25];

  const createFolder = () => {
    const newPath = `${pathname}/${value}`;
    const newNote: Note = {
      path: newPath,
    };

    setAppState((prev) => ({
      ...prev,
      notes: [...prev.notes, newNote],
    }));

    setOpen(false);
    router.push(newPath);
  };

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      snapPoints={snapPoints}
      snapPointsMode="percent"
      dismissOnSnapToBottom
      position={position}
      onPositionChange={setPosition}
      zIndex={100_000}
      animation="bouncy"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />

      <Sheet.Frame
        padding="$4"
        justifyContent="center"
        alignItems="center"
        gap="$5"
      >
        <XStack gap="$4" alignItems="center">
          <Input
            flex={1}
            value={value}
            onChangeText={setValue}
            placeholder="Folder Name"
          />
          <Button onPress={createFolder}>
            <FolderPlus />
          </Button>
        </XStack>
      </Sheet.Frame>
    </Sheet>
  );
};
