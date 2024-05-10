import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectLoading, selectFormData, selectIsNew } from "./selectors";
import { SaveEntity, InitEntity, UpdateFormValue, SetEntity } from "./reducers";
import { AppDispatch } from "../store";

const useEntity = (entityId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    loading: useSelector(selectLoading(entityId), shallowEqual),
    formData: useSelector(selectFormData(entityId), shallowEqual),
    isNew: useSelector(selectIsNew(entityId), shallowEqual),
    initEntity: useCallback(() => dispatch(InitEntity(entityId)), [dispatch]),
    saveEntity: useCallback(() => dispatch(SaveEntity(entityId)), [dispatch]),
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
