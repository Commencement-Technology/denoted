import { Note } from "data/Note";
import { H4, Text } from "tamagui";

export function NotePreview({ note }: { note: Note }) {
  return <H4 color="#F00">{note.path}</H4>;
}
