import { AnyType } from "@common/types";

export default interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  choices: Array<{
    label: string;
    action?: AnyType;
    variant?: "text" | "outlined" | "contained";
  }>;
}
