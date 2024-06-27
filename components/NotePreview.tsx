import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { Card, H4, Paragraph } from "tamagui";

export function NotePreview({ path, note }: { path: string; note: Note }) {
  const { appState, setAppState } = useAppContext();

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
        {note.title && <H4 color="#6366F1">{note.title}</H4>}
        {note.body && (
          <Paragraph color="#111" theme="alt2">
            {note.body?.slice(0, 256)}
          </Paragraph>
        )}
      </Card.Header>
    </Card>
  );
}
