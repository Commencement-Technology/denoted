import { FolderPlus, Search } from "@tamagui/lucide-icons";
import { useState } from "react";
import { XStack } from "tamagui";
import { Button } from "tamagui.config";
import { SheetModal } from "./SheetModal";

export function ExploreHeader() {
  // const [searchOpen, setSearchOpen] = useState(false);
  const [folderOpen, setFolderOpen] = useState(false);

  return (
    <>
      <XStack gap="$2">
        <Button onPress={() => setFolderOpen(true)}>
          <FolderPlus />
        </Button>
        <Button
        // onPress={() => setSearchOpen(true)}
        >
          <Search />
        </Button>
      </XStack>
      {/* <SheetModal open={searchOpen} setOpen={setSearchOpen} /> */}
      <SheetModal open={folderOpen} setOpen={setFolderOpen} />
    </>
  );
}
