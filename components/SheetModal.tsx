import { Sheet } from "@tamagui/sheet";
import { useState } from "react";
import { EditFile } from "./EditFile";
import { ModifyTags } from "./ModifyTags";
import { useAppContext } from "app/AppContext";
import { SearchModal } from "./SearchModal";

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
            EDIT: <EditFile setOpen={setOpen} />,
            TAGS: <ModifyTags />,
            SEARCH: <SearchModal />,
          }[appState.modal_state.type || "EDIT"]
        }
      </Sheet.Frame>
    </Sheet>
  );
};

// function InnerSheet(props: SheetProps) {
//   return (
//     <Sheet
//       animation="bouncy"
//       modal
//       snapPoints={[90]}
//       dismissOnSnapToBottom
//       {...props}
//     >
//       <Sheet.Overlay
//         animation="bouncy"
//         enterStyle={{ opacity: 0 }}
//         exitStyle={{ opacity: 0 }}
//       />

//       <Sheet.Handle />

//       <Sheet.Frame
//         flex={1}
//         justifyContent="center"
//         alignItems="center"
//         gap="$5"
//       >
//         <Sheet.ScrollView>
//           <YStack p="$5" gap="$8">
//             <Button
//               size="$6"
//               circular
//               alignSelf="center"
//               icon={ChevronDown}
//               onPress={() => props.onOpenChange?.(false)}
//             />

//             <H2>Hello world</H2>

//             {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//               <Paragraph key={i} size="$8">
//                 Eu officia sunt ipsum nisi dolore labore est laborum laborum in
//                 esse ad pariatur. Dolor excepteur esse deserunt voluptate labore
//                 ea. Exercitation ipsum deserunt occaecat cupidatat consequat est
//                 adipisicing velit cupidatat ullamco veniam aliquip reprehenderit
//                 officia. Officia labore culpa ullamco velit. In sit occaecat
//                 velit ipsum fugiat esse aliqua dolor sint.
//               </Paragraph>
//             ))}
//           </YStack>
//         </Sheet.ScrollView>
//       </Sheet.Frame>
//     </Sheet>
//   );
// }
