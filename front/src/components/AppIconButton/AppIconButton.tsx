import { IconButton, Tooltip } from "@mui/material";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  button: {
    "&:hover,&:focus,&:active": {
      backgroundColor: "lightGrey",
    },
  },
}));

export interface AppIconButtonProps {
  id: string;
  label: string;
  size?: "small" | "medium";
  onClick: any;
  icon: JSX.Element;
  disabled?: boolean;
  className?: any;
  ref?: any;
}

const AppIconButton = ({
  id,
  label,
  size = "small",
  onClick,
  icon,
  disabled,
  className,
  ref,
}: AppIconButtonProps) => {
  const styles = useStyles();

  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          role="button"
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }
            onClick(e);
            if (ref) {
              ref.current = e.currentTarget;
            }
          }}
          id={id}
          tabIndex={0}
          aria-hidden={true}
          className={classNames({
            [styles.button]: true,
            ["Mui-disabled"]: disabled,
            [className]: className,
          })}
          size={size}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default AppIconButton;
