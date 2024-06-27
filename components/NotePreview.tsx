import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { Card, H4, Paragraph, XStack } from "tamagui";

export function NotePreview({
  path,
  note,
  deadline,
}: {
  path: string;
  note: Note;
  deadline: string;
}) {
  const { appState } = useAppContext();

  let cardColor = "#eee";
  for (let tag of note.tag_ids || []) {
    if (appState.tags[tag].color) {
      cardColor = appState.tags[tag].color || "#eee";
      break;
    }
  }

  return (
    <Card
      minHeight="$5"
      maxHeight="$16"
      backgroundColor={cardColor}
      borderColor="#ccc"
      borderWidth={1}
    >
      <Card.Header padded>
        {deadline !== "None" && (
          <XStack alignSelf="flex-end" x="$-2.5" y="$2" position="absolute">
            <Paragraph
              size="$2"
              borderWidth={1}
              borderRadius="$8"
              paddingHorizontal="$1.5"
              color="#333"
            >
              Due {deadline}
            </Paragraph>
          </XStack>
        )}
        {!note.title && !note.body && (
          <H4 color="#444">Untitled #{path.substring(1, path.indexOf("."))}</H4>
        )}
        {note.title && <H4 color="#333">{note.title}</H4>}
        {note.body && (
          <Paragraph color="#444" theme="alt2">
            {note.body?.slice(0, 256)}
          </Paragraph>
        )}
      </Card.Header>
    </Card>
  );
}
