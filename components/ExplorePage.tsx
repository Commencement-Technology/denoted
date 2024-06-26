import { usePathname, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, ButtonText, Main } from "tamagui.config";
import { H2, ScrollView, Section } from "tamagui";
import { useAppContext } from "app/AppContext";
import { Note } from "data/Note";
import { NotePreview } from "./NotePreview";
import { FolderPreview } from "./FolderPreview";

export function ExplorePage() {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();

  const filtered: Map<string, Note> = appState.notes?.reduce(
    (map, note) =>
      note.path.startsWith(pathname)
        ? map.set(
            note.path.slice(
              pathname.length,
              note.path.indexOf("/", pathname.length + 1) + 1 || undefined
            ),
            note
          )
        : map,
    new Map<string, Note>()
  );

  console.log(pathname);
  console.log(appState);
  console.log(filtered);

  const createNote = () => {
    const newPath = `${pathname}/${appState.notes_count}.txt`;
    const newNote: Note = {
      path: newPath,
      body: "",
      tag_ids: [],
    };

    setAppState((prev) => ({
      ...prev,
      notes_count: prev.notes_count + 1,
      notes: [...prev.notes, newNote],
    }));

    router.push(newPath);
  };

  return (
    <Main>
      <StatusBar />
      <H2 color="#000">{pathname}</H2>
      <ScrollView
        // horizontal
        // showsHorizontalScrollIndicator={false}
        px={40}
        contentContainerStyle={{ gap: 14, paddingTop: 14 }}
      >
        {[...filtered].map(([path, note]) => (
          <Section onPress={() => router.push(pathname + path)} key={path}>
            {path.endsWith(".txt") ? (
              <NotePreview note={note} />
            ) : (
              <FolderPreview note={note} />
            )}
          </Section>
        ))}
      </ScrollView>
      <Button onPress={createNote}>
        <ButtonText>Add Note</ButtonText>
      </Button>
    </Main>
  );
}

// <Main>
//   <H2>Notes</H2>
//   <H2>{pathname}</H2>
//   {/* <ImageBackground
//     source={{
//       uri: "https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
//     }}
//     style={{ width: "100%", height: 200 }}
//     onError={(err) => {
//       console.log("err", err);
//     }}
//   > */}
//   <Container>
//     <YStack>
//       <Title
//         color="#fff"
//         enterStyle={{ opacity: 0, scale: 2.5, y: -10 }}
//         animation="quick"
//       >
//         Trending
//       </Title>
//       <H2>Tamagui + ExpOOOOOOOOOOOOOOOOOo</H2>
//       {/* <Input
//           placeholder="Search for a Movie, TV Show Person"
//           placeholderTextColor="#fff"
//           borderWidth={4}
//           size="$4"
//           value={searchString}
//           onChangeText={setSearchString}
//         /> */}
//     </YStack>
//   </Container>
//   {/* </ImageBackground> */}

//   <Subtitle p={10} enterStyle={{ opacity: 0 }} animation="lazy">
//     {/* {searchQuery.data?.results ? "Search Results" : "Trending"} */}
//   </Subtitle>

//   {/* {isLoading && <Spinner py={14} size="large" color="$blue10" />} */}

//
// </Main>
