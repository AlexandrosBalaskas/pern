import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import useValidation from "../store/validations/useValidations";
import { getAllValidationErrors } from "../utils/textValidationUtils";
import { selectFieldValid } from "../store/validations/selectors";

const useFieldValidations = (
  fieldId: string,
  value: string,
  validations: any = {}
) => {
  const dispatch = useDispatch();
  const { setFieldFormError, errors, isFormDirty, formDirtyId } =
    useValidation(fieldId);
  const [dirty, setDirty] = useState(false);
  const valid = useSelector(selectFieldValid(fieldId), shallowEqual);

  useEffect(() => {
    if (isFormDirty && fieldId.startsWith(formDirtyId)) {
      setDirty(true);
    }
  }, [isFormDirty, formDirtyId, fieldId]);

  useEffect(() => {
    return () => {
      if (errors.length === 0) {
        return;
      }
      setFieldFormError({ errors: [], field: fieldId });
    };
  }, [errors]);

  useEffect(() => {
    const validationErrors = getAllValidationErrors(validations, value);
    if (errors.length === 0 && validationErrors.length === 0) {
      return;
    }

    dispatch(
      setFieldFormError({
        errors: validationErrors,
        field: fieldId,
      })
    );
  }, [value, errors, fieldId]);

  return {
    dirty,
    errors,
    valid: !dirty ? true : valid,
  };
};

export default useFieldValidations;
