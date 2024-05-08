import { Button } from "@mui/material";
import AppButtonProps from "./AppButton.d";

const AppButton = ({
  id,
  variant,
  color,
  size,
  label,
  onClick,
  styles,
  type,
  disabled,
}: AppButtonProps) => {
  return (
    <Button
      variant={variant || "contained"}
      id={id}
      onClick={onClick ? onClick : (e) => e.preventDefault()}
      color={color || "primary"}
      size={size || "medium"}
      className={styles}
      type={type || "button"}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default AppButton;
