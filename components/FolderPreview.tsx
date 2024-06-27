import { Note } from "data/Note";
import { H4, Text } from "tamagui";

export function FolderPreview({ note }: { note: Note }) {
  return <H4 color="#333">{note.path}</H4>;
}
