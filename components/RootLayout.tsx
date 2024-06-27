import { TamaguiProvider, Theme } from "tamagui";

import config from "../tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppContextProvider } from "../app/AppContext";

export function RootLayout() {
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
