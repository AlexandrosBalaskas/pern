export default interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  choices: Array<{
    label: string;
    action?: any;
    variant?: "text" | "outlined" | "contained";
  }>;
}
