import { DynamicForm } from "./DynamicForm";
import { useSchemas } from "../hooks/useSchemas";
import { FALLBACK_SCHEMAS } from "../forms/fallbackSchemas";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useEntity from "../store/entity/useEntity";
import { Alert, Backdrop, Grid, Snackbar, Tooltip } from "@mui/material";
import AppButton from "./AppButton/AppButton";
import { useTranslation } from "react-i18next";
import useValidations from "../store/validations/useValidations";
import useFormValidity from "../store/validations/useFormValidity";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  backBtn: {
    marginRight: "10px",
    display: "inline",
  },
}));

export const DynamicPage = () => {
  const styles = useStyles();
  const { t: translate } = useTranslation("common");
  const navigate = useNavigate();
  const routeParams = useParams<any>();
  const pageId = useMemo(() => {
    return routeParams?.category || "";
  }, [routeParams]);

  const idKey = useMemo(() => {
    return routeParams?.idKey || "";
  }, [routeParams]);

  const { schema, uiSchema } = useSchemas(pageId, FALLBACK_SCHEMAS);

  const { setFormDirty } = useValidations(pageId);
  const { isFormValid } = useFormValidity(pageId);
  const { clearEntities } = useEntity(pageId);

  const {
    saveEntity,
    initEntity,
    loadEntity,
    loading,
    id,
    snackBarOpen,
    snackBarMessage,
    closeSnackBar,
  } = useEntity(pageId);

  useEffect(() => {
    snackBarOpen &&
      setTimeout(() => {
        closeSnackBar();
      }, 6000);
  }, [snackBarOpen]);

  useEffect(() => {
    !idKey && initEntity();
  }, [idKey]);

  useEffect(() => {
    id && !idKey && navigate(`/page/${pageId}/${id}`);
  }, [id]);

  useEffect(() => {
    idKey && loadEntity(idKey);
  }, [idKey]);

  const onClickSubmit = useCallback(() => {
    if (isFormValid) saveEntity();
    else setFormDirty({ dirty: true, formId: pageId });
  }, [saveEntity, isFormValid]);

  const onClickBack = useCallback(() => {
    clearEntities();
    navigate(`/page/${pageId}/list`);
  }, [navigate, pageId]);

  return (
    <>
      <Backdrop open={loading} />
      <DynamicForm
        schema={schema}
        uiSchema={uiSchema}
        pageId={pageId}
        submitButton={
          <Grid item xs={12}>
            <div className={styles.backBtn}>
              <AppButton
                type="button"
                id={`${pageId}-back-btn`}
                variant="outlined"
                label={translate("back")}
                onClick={onClickBack}
              />
            </div>
            <AppButton
              type="button"
              id={`${pageId}-form-btn`}
              variant="outlined"
              label={translate("submit")}
              onClick={onClickSubmit}
            />
          </Grid>
        }
      />
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => {
          closeSnackBar();
        }}
      >
        <Alert
          onClose={() => {
            closeSnackBar();
          }}
          severity="success"
          variant="filled"
          sx={{ width: "max-content" }}
        >
          {translate(snackBarMessage)}
        </Alert>
      </Snackbar>
    </>
  );
};
