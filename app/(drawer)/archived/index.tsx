import { DrawerToggleButton } from "@react-navigation/drawer";
import { usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet } from "react-native";
import { Button, H2, Input, ScrollView, Spinner, YStack } from "tamagui";

import { Container, Main, Subtitle, Title } from "tamagui.config";
import { NotePage } from "components/NotePage";
import { ExplorePage } from "components/ExplorePage";
// import useDebounce from "~/utils/useDebounce";

const Page = () => {
  const pathname = usePathname();
  console.log("REST", pathname);

  return pathname.endsWith(".txt") ? <NotePage /> : <ExplorePage />;
};

export default Page;
