import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch } from "../store";
import { SetFieldFormError, SetFormDirty } from "./reducers";
import {
  selectFieldErrors,
  selectFormDirty,
  selectFormDirtyId,
  selectIsFormValid,
} from "./selectors";

const useValidations = (fieldId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    errors: useSelector(
      selectFieldErrors(fieldId),
      (left, right) =>
        JSON.stringify(left || {}) === JSON.stringify(right || {})
    ),
    formDirtyId: useSelector(selectFormDirtyId),
    isFormDirty: useSelector(selectFormDirty),
    setFieldFormError: useCallback(
      ({ field, errors }: { field: string; errors: any }) =>
        dispatch(SetFieldFormError({ field, errors })),
      [dispatch]
    ),
    setFormDirty: useCallback(
      ({ dirty, formId }: { dirty: boolean; formId: string }) =>
        dispatch(SetFormDirty({ dirty, formId })),
      [dispatch]
    ),
  };
};

export default useValidations;
