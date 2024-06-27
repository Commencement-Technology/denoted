import { Archive, StickyNote } from "@tamagui/lucide-icons";
import { router, usePathname } from "expo-router";
import { XStack, YStack } from "tamagui";
import { Button, ButtonText, Container } from "tamagui.config";

export function SideBar() {
  const pathname = usePathname();

  return (
    <Container marginTop="$4">
      <YStack gap="$2">
        <Button
          onPress={() => router.navigate("/notes")}
          alignItems="flex-start"
          borderRadius="$4"
        >
          <XStack gap="$2">
            <StickyNote />
            <ButtonText>Notes</ButtonText>
          </XStack>
        </Button>
        <Button
          onPress={() => router.navigate("/archived")}
          alignItems="flex-start"
          borderRadius="$4"
        >
          <XStack gap="$2">
            <Archive />
            <ButtonText>Archived</ButtonText>
          </XStack>
        </Button>
      </YStack>
    </Container>
  );
}
