export type ActionButtonProps = {
  id: string;
  action: any;
  style?: "menu" | "button" | "icon" | "link" | "simple";
  onCall?: () => void;
  pageId: string;
};
