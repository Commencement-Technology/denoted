import { usePathname } from "expo-router";
import { NotePage } from "components/NotePage";
import { ExplorePage } from "components/ExplorePage";

const AppScreen = () => {
  const pathname = usePathname();

  return pathname.endsWith(".txt") ? <NotePage /> : <ExplorePage />;
};

export default AppScreen;
