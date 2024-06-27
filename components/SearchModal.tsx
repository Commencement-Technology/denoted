import { useAppContext } from "app/AppContext";
import { useEffect, useState } from "react";
import { Button, H2, Input, ToggleGroup, XStack } from "tamagui";
import { ButtonText } from "tamagui.config";

export function SearchModal() {
  const { appState, setAppState } = useAppContext();
  const [query, setQuery] = useState(appState.modal_state.query);

  useEffect(() => {
    setAppState((prev) => ({
      ...prev,
      modal_state: {
        ...prev.modal_state,
        query,
      },
    }));
  }, [query]);

  const toggleQueryTag = (name, tag, toSelect) => {
    setAppState((prev) => ({
      ...prev,
      modal_state: {
        ...prev.modal_state,
        query_tags: toSelect
          ? [...(prev.modal_state.query_tags || []), name]
          : prev.modal_state.query_tags?.filter((id) => id != name),
      },
    }));
  };

  return (
    <>
      <XStack gap="$4" alignItems="center">
        <Input
          flex={1}
          value={query}
          onChangeText={setQuery}
          placeholder="Search in notes"
        />
      </XStack>
      <H2>Tags</H2>
      <ToggleGroup type="multiple" size="$0.5" gap="$2" flexWrap="wrap">
        {Object.entries(appState.tags).map(([name, tag]) => {
          const isSelected = appState.modal_state.query_tags?.includes(name);

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
              onPress={() => toggleQueryTag(name, tag, !isSelected)}
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
