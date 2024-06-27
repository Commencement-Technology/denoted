import { Archive, StickyNote } from "@tamagui/lucide-icons";
import { router, usePathname } from "expo-router";
import { XStack, YStack } from "tamagui";
import { Button, ButtonText, Container } from "tamagui.config";

export function SideBar() {
  const pathname = usePathname();
  const isNotes = pathname.startsWith("/notes");

  return (
    <Container marginTop="$4">
      <YStack gap="$2">
        <Button
          onPress={() => router.navigate("/notes")}
          alignItems="flex-start"
          borderRadius="$4"
          {...(isNotes && { backgroundColor: "#6366F1" })}
        >
          <XStack gap="$2">
            <StickyNote {...(!isNotes && { color: "#6366F1" })} />
            <ButtonText {...(!isNotes && { color: "#6366F1" })}>
              Notes
            </ButtonText>
          </XStack>
        </Button>
        <Button
          onPress={() => router.navigate("/archived")}
          alignItems="flex-start"
          borderRadius="$4"
          {...(!isNotes && { backgroundColor: "#6366F1" })}
        >
          <XStack gap="$2">
            <Archive {...(isNotes && { color: "#6366F1" })} />
            <ButtonText {...(isNotes && { color: "#6366F1" })}>
              Archived
            </ButtonText>
          </XStack>
        </Button>
      </YStack>
    </Container>
  );
}
