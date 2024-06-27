import { FolderPlus, Search } from "@tamagui/lucide-icons";
import { useAppContext } from "app/AppContext";
import { useState } from "react";
import { XStack } from "tamagui";
import { Button } from "tamagui.config";
// import { SheetModal } from "./SheetModal";

export function ExploreHeader() {
  const { appState, setAppState } = useAppContext();

  const openFolderModal = () => {
    setAppState((prev) => ({
      ...prev,
      modal_state: {
        open: true,
        note: undefined,
        type: "EDIT",
      },
    }));
  };

  const openSearchModal = () => {
    setAppState((prev) => ({
      ...prev,
      modal_state: {
        open: true,
        note: undefined,
        type: "TAGS",
      },
    }));
  };

  return (
    <>
      <XStack gap="$2">
        <Button onPress={openFolderModal}>
          <FolderPlus />
        </Button>
        <Button onPress={openSearchModal}>
          <Search />
        </Button>
      </XStack>
    </>
  );
}
