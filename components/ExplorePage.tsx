import { usePathname } from "expo-router";
import { Main } from "tamagui.config";
import { Button, XGroup, XStack, YStack } from "tamagui";
import { useAppContext } from "app/AppContext";

export function ExplorePage() {
  const pathname = usePathname();
  const { appState, setAppState } = useAppContext();

  // const filtered = notes?.filter((note) => note.path.startsWith(pathname));
  console.log(appState);

  return (
    <Main>
      <Button onPress={() => console.log("PRESSED")}>Plain</Button>
    </Main>
  );
}

// <Main>
//   <StatusBar />
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

//   <ScrollView
//     horizontal
//     showsHorizontalScrollIndicator={false}
//     py={40}
//     contentContainerStyle={{ gap: 14, paddingLeft: 14 }}
//   >
//     {/* {!isLoading &&
//       (searchQuery.data?.results
//         ? searchQuery.data?.results.map((item) => (
//             <MovieCard key={item.id} movie={item} />
//           ))
//         : trendingQuery.data?.results &&
//           trendingQuery.data?.results.map((item) => (
//             <MovieCard key={item.id} movie={item} />
//           )))} */}
//   </ScrollView>
// </Main>
