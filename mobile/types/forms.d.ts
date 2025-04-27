// import { Control } from "react-hook-form";
import { TextInputProps } from "react-native";

export type AppTextInputProps = TextInputProps & {
  name: string;
  label?: string | ReactNode;
  error?: string;
  hint?: string | ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  inputBoxStyle?: ViewStyle;
};

// export interface FormTextInputProps extends AppTextInputProps {
//   control: Control<any>;
// }
