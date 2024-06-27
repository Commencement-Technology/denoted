import { Folder } from "@tamagui/lucide-icons";
import { Note } from "data/Note";
import { Card, H4, XStack } from "tamagui";

export function FolderPreview({ path, note }: { path: string; note: Note }) {
  return (
    <Card backgroundColor="transparent">
      <Card.Header padding="$1">
        <XStack alignItems="center" gap="$4">
          <Folder color="#6366F1" />
          <H4 color="#6366F1">{path.substring(1)}</H4>
        </XStack>
      </Card.Header>
    </Card>
  );
}
