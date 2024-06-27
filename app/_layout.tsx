import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { TamaguiProvider, Theme } from "tamagui";

import config from "../tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppContextProvider } from "./AppContext";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Theme name={"blue"}>
          <AppContextProvider />
        </Theme>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
