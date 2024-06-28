import { Sheet } from "@tamagui/sheet";
import { useState } from "react";
import { useAppContext } from "app/AppContext";
import { SheetCreateFolder } from "./SheetCreateFolder";
import { SheetEditTags } from "./SheetEditTags";
import { SheetSearch } from "./SheetSearch";

export const SheetModal = () => {
  const { appState, setAppState } = useAppContext();
  const [position, setPosition] = useState(0);
  const snapPoints = [85, 50, 25];

  const setOpen = (value: boolean) => {
    setAppState((prev) => {
      const state = { ...prev };
      state.modal_state.open = value;
      return state;
    });
  };

  return (
    <Sheet
      forceRemoveScrollEnabled={appState.modal_state.open}
      modal={false}
      open={appState.modal_state.open}
      onOpenChange={setOpen}
      snapPoints={snapPoints}
      snapPointsMode="percent"
      dismissOnSnapToBottom
      position={position}
      onPositionChange={setPosition}
      zIndex={100_000}
      animation="bouncy"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />

      <Sheet.Frame
        padding="$4"
        justifyContent="center"
        alignItems="center"
        gap="$5"
      >
        {
          {
            CREATE_FOLDER: <SheetCreateFolder />,
            EDIT_TAGS: <SheetEditTags />,
            SEARCH: <SheetSearch />,
          }[appState.modal_state.type || "SEARCH"]
        }
      </Sheet.Frame>
    </Sheet>
  );
};
