import { usePathname } from "expo-router";
import { NotePage } from "components/NotePage";
import { ExplorePage } from "components/ExplorePage";
import { SheetModal } from "components/SheetModal";

const AppScreen = () => {
  const pathname = usePathname();

  return (
    <>
      <SheetModal />
      {pathname.endsWith(".txt") ? <NotePage /> : <ExplorePage />}
    </>
  );
};

export default AppScreen;
