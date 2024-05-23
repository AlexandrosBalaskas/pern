import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  selectLoading,
  selectFormData,
  selectIsNew,
  selectId,
  selectSnackBarOpen,
  selectSnackBarMessage,
} from "./selectors";
import {
  SaveEntity,
  InitEntity,
  UpdateFormValue,
  SetEntity,
  LoadEntity,
  CloseSnackBar,
  ClearEntities,
} from "./reducers";
import { AppDispatch } from "../store";

const useEntity = (entityId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    loading: useSelector(selectLoading(entityId), shallowEqual),
    formData: useSelector(selectFormData(entityId), shallowEqual),
    isNew: useSelector(selectIsNew(entityId), shallowEqual),
    id: useSelector(selectId(entityId), shallowEqual),
    snackBarOpen: useSelector(selectSnackBarOpen(entityId), shallowEqual),
    snackBarMessage: useSelector(selectSnackBarMessage(entityId), shallowEqual),
    initEntity: useCallback(() => dispatch(InitEntity(entityId)), [dispatch]),
    saveEntity: useCallback(
      () => dispatch(SaveEntity({ entityId })),
      [dispatch]
    ),
    clearEntities: useCallback(
      () => dispatch(ClearEntities({ entityId })),
      [dispatch]
    ),
    closeSnackBar: useCallback(
      () => dispatch(CloseSnackBar({ entityId })),
      [dispatch]
    ),
    loadEntity: useCallback(
      (idKey: any) => dispatch(LoadEntity({ entityId, idKey })),
      [dispatch]
    ),
    setEntity: useCallback(
      (response: any) => dispatch(SetEntity({ entityId, response })),
      [dispatch]
    ),
    updateFormValue: useCallback(
      (fieldId: string, value: any, entityId: string) =>
        dispatch(UpdateFormValue({ fieldId, value, entityId })),
      [dispatch]
    ),
  };
};

export default useEntity;
