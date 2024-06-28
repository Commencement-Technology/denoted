import { useAppContext } from "app/AppContext";
import { Input, XStack } from "tamagui";
import { TagSelector } from "./TagSelector";

export function SheetSearch() {
  const { appState, setAppState } = useAppContext();

  const searchQuery = (text) => {
    setAppState((prev) => {
      const state = { ...prev };
      state.modal_state.query = text;
      return state;
    });
  };

  const toggleQueryTag = (name, tag, toSelect) => {
    setAppState((prev) => {
      const state = { ...prev };
      state.modal_state.query_tags = toSelect
        ? [...(state.modal_state.query_tags || []), name]
        : state.modal_state.query_tags?.filter((id) => id != name);
      return state;
    });
  };

  return (
    <>
      <XStack gap="$4" alignItems="center">
        <Input
          flex={1}
          value={appState.modal_state.query}
          onChangeText={(text) => searchQuery(text)}
          placeholder="Search in notes"
        />
      </XStack>
      <TagSelector
        comparable={appState.modal_state.query_tags}
        onPress={toggleQueryTag}
      />
    </>
  );
}
