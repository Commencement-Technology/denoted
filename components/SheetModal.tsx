import { Sheet } from "@tamagui/sheet";
import { useState } from "react";
import { EditFile } from "./EditFile";
import { ModifyTags } from "./ModifyTags";
import { Note } from "data/Note";
import { useAppContext } from "app/AppContext";

export const SheetModal = () => {
  const { appState, setAppState } = useAppContext();
  const [position, setPosition] = useState(0);
  const snapPoints = [85, 50, 25];

  const setOpen = (value: boolean) => {
    setAppState((prev) => ({
      ...prev,
      modal_state: { ...prev.modal_state, open: value },
    }));
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
            EDIT: (
              <EditFile setOpen={setOpen} note={appState.modal_state.note} />
            ),
            TAGS: (
              <ModifyTags setOpen={setOpen} note={appState.modal_state.note} />
            ),
          }[appState.modal_state.type || "EDIT"]
        }
      </Sheet.Frame>
    </Sheet>
  );
};
