import { ActionButtonType } from "@common/components/AppActions/types";
import { AnyType } from "@common/types";

export type ActionButtonProps = {
  id: string;
  action: ActionButtonType;
  style?: "menu" | "button" | "icon" | "link" | "simple";
  onCall?: () => void;
  pageId: string;
};
