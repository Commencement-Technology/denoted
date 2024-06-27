import { FolderPlus, Search } from "@tamagui/lucide-icons";
import { XStack } from "tamagui";
import { Button } from "tamagui.config";

export function ExploreHeader() {
  return (
    <XStack gap="$2">
      <Button>
        <FolderPlus />
      </Button>
      <Button>
        <Search />
      </Button>
    </XStack>
  );
}
