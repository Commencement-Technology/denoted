import { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { XStack, Input } from "tamagui";
import { Calendar, Clock } from "@tamagui/lucide-icons";

interface datePickerProps {
  date?: Date;
  type: "date" | "time";
  confirmText?: string;
  cancelText?: string;
  accentColor?: string;
  textColor?: string;
  buttonTextColorIOS?: string;
  onChange?: (date: Date) => void;
  onConfirm?: (date: Date) => void;
  onCancel: () => void;
}

const DateTimePicker = function DatePicker(props: datePickerProps) {
  const [date, setDate] = useState(props.date);

  useEffect(() => {
    setDate(props.date);
  }, [props.date]);

  const handleConfirm = (date: Date) => {
    setDate(date);
    props.onConfirm && props.onConfirm(date);
  };

  const type = props.type || "date";

  return (
    <>
      <XStack alignItems={"center"} justifyContent="flex-end">
        <Input pointerEvents="none" editable={false} flexGrow={1}>
          {type === "date" && date?.toLocaleDateString()}

          {type === "time" && date?.toLocaleTimeString()}
        </Input>

        <XStack paddingRight={10} position="absolute">
          {type === "date" && <Calendar />}

          {type === "time" && <Clock />}
        </XStack>
      </XStack>

      <DateTimePickerModal
        cancelTextIOS={props.cancelText}
        confirmTextIOS={props.confirmText}
        date={date}
        isVisible={true}
        mode={type}
        // display="inline"
        accentColor={props.accentColor}
        textColor={props.textColor}
        buttonTextColorIOS={props.buttonTextColorIOS}
        onChange={props.onChange}
        onConfirm={handleConfirm}
        onCancel={props.onCancel}
      />
    </>
  );
};

export default DateTimePicker;
