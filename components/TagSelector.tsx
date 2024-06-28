import { useAppContext } from "app/AppContext";
import { H2, ToggleGroup, XStack } from "tamagui";
import { ButtonText } from "tamagui.config";

export function TagSelector({ comparable, onPress }) {
  const { appState } = useAppContext();

  return (
    <>
      <H2>Tags</H2>
      <ToggleGroup type="multiple" size="$0.5" gap="$2" flexWrap="wrap">
        {Object.entries(appState.tags).map(([name, tag]) => {
          const isSelected = comparable?.includes(name);

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
              onPress={() => onPress(name, tag, !isSelected)}
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
