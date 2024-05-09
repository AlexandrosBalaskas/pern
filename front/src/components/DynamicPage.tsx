import { DynamicForm } from "./DynamicForm";
import { useSchemas } from "../hooks/useSchemas";
import { FALLBACK_SCHEMAS } from "../forms/fallbackSchemas";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import useEntity from "../store/entity/useEntity";
import api from "../axiosConfig";
import { Grid, Tooltip } from "@mui/material";
import AppButton from "./AppButton/AppButton";
import { useTranslation } from "react-i18next";

export const DynamicPage = () => {
  const { t: translate } = useTranslation("common");
  const routeParams = useParams<any>();
  const pageId = useMemo(() => {
    return routeParams?.category || "";
  }, [routeParams]);

  const idKey = useMemo(() => {
    return routeParams?.idKey || "";
  }, [routeParams]);

  const { schema, uiSchema } = useSchemas(pageId, FALLBACK_SCHEMAS);

  const { initEntity, setEntity, formData, isNew } = useEntity(pageId);

  useEffect(() => {
    idKey &&
      api.get(`/${pageId}/${idKey}`).then((response: any) => {
        setEntity(response?.data);
      });
  }, [pageId, idKey, setEntity]);

  const onClick = useCallback(() => {
    const url = isNew ? `${pageId}` : `${pageId}/${idKey}`;
    console.log(formData, "fr");
    api({
      method: isNew ? "post" : "put",
      url,
      data: formData,
    }).then((response: any) => {
      setEntity(response?.data);
    });
  }, [formData, idKey, isNew, pageId, setEntity]);

  useEffect(() => {
    initEntity();
  }, [schema, initEntity]);

  return (
    <DynamicForm
      schema={schema}
      uiSchema={uiSchema}
      pageId={pageId}
      submitButton={
        <Grid item xs={12}>
          <Tooltip title={translate("submitButtonAriaLabel")}>
            <AppButton
              type="button"
              id={`${pageId}-form-btn`}
              variant="outlined"
              label={translate("submit")}
              onClick={onClick}
            />
          </Tooltip>
        </Grid>
      }
    ></DynamicForm>
  );
};
