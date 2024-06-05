import { ActionButtonType } from "@common/components/AppActions/types";
import { AnyType } from "@common/types";

export type ActionButtonProps = {
  id: string;
  action: ActionButtonType;
  style?: "menu" | "button" | "icon" | "link" | "simple";
  setSnackbarOpen?: (arg: any) => void;
  // onCall?: () => void;
  pageId: string;
};
