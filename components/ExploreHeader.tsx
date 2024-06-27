import { FolderPlus, Search } from "@tamagui/lucide-icons";
import { useAppContext } from "app/AppContext";
import { XStack } from "tamagui";
import { Button } from "tamagui.config";

export function ExploreHeader() {
  const { setAppState } = useAppContext();

  const openFolderModal = () => {
    setAppState((prev) => {
      const state = prev;
      state.modal_state.open = true;
      state.modal_state.note = undefined;
      state.modal_state.type = "EDIT";
      return state;
    });
  };

  const openSearchModal = () => {
    setAppState((prev) => {
      const state = prev;
      state.modal_state.open = true;
      state.modal_state.note = undefined;
      state.modal_state.type = "SEARCH";
      state.modal_state.query = "";
      state.modal_state.query_tags = [];
      return state;
    });
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
