export default interface AppButtonProps {
  id: string;
  variant?: "text" | "outlined" | "contained";
  color?: any;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: (event: any) => void;
  styles?: string;
  type?: "reset" | "submit" | "button";
  disabled?: boolean;
  href?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}
