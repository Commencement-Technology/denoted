import { usePathname } from "expo-router";
import { Main } from "tamagui.config";

export function NotePage() {
  const pathname = usePathname();

  return <Main></Main>;
}
