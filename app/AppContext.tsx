import React from "react";
import { Slot } from "expo-router";
import { storage } from "data";
import { Note } from "data/Note";
import { Tag } from "data/Tag";

export type stateType = {
  notes: Note[];
  tags: Tag[];
  notes_count: number;
};

const defaultState: stateType = {
  notes: [],
  tags: [],
  notes_count: 0,
};

export const AppContext = React.createContext<{
  appState: stateType;
  setAppState: React.Dispatch<React.SetStateAction<stateType>>;
}>({
  appState: defaultState,
  setAppState: () => {},
});

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = () => {
  const localState = storage.getString("app_state");
  const [appState, setAppState] = React.useState(localState || defaultState);

  React.useEffect(() => {
    storage.set("app_state", JSON.stringify(appState));
  }, [appState]);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      <Slot />
    </AppContext.Provider>
  );
};
