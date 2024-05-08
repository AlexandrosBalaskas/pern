import React from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";

import ConfirmationDialogProps from "./ConfirmationDialog.d";
import AppButton from "../AppButton/AppButton";

const ConfirmationDialog = ({
  open,
  onClose,
  title,
  message,
  choices,
}: ConfirmationDialogProps): React.JSX.Element => {
  return (
    <Dialog
      id="confirmation-dialog"
      open={open}
      onClose={() => onClose()}
      onClick={(e) => e.stopPropagation()}
    >
      {title && (
        <DialogTitle>
          <Typography variant="body1" id="confirmation-dialog-title">
            {title}
          </Typography>
        </DialogTitle>
      )}
      <DialogContent dividers>
        <Grid
          container
          alignItems="center"
          direction="row"
          justifyContent="center"
        >
          <Grid id="confirmation-dialog-content" item xs={12}>
            {message}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {choices.map((choice: any, i: any) => (
          <AppButton
            id={`confirmation-dialog-${choice.label}-btn`}
            key={i}
            onClick={() => {
              choice.action && choice.action();
              onClose();
            }}
            label={choice.label}
            variant={choice.variant || "outlined"}
          />
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
