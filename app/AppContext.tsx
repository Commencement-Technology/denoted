import React from "react";
import { Slot } from "expo-router";
import { storage } from "data";
import { Note } from "data/Note";
import { Tag } from "data/Tag";

export type stateType = {
  notes: Note[];
  notes_count: number;
  tags: Record<string, Tag>;
  modal_state: {
    open: boolean;
    note?: Note;
    type?: string;
  };
};

const defaultState: stateType = {
  notes: [],
  notes_count: 0,
  tags: {},
  modal_state: {
    open: false,
  },
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
  const [appState, setAppState] = React.useState(
    localState ? { ...defaultState, ...JSON.parse(localState) } : defaultState
  );

  React.useEffect(() => {
    storage.set("app_state", JSON.stringify(appState));
  }, [appState]);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      <Slot />
    </AppContext.Provider>
  );
};
