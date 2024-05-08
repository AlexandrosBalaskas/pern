import { useDispatch, useSelector } from "react-redux";
import { selectFieldValue } from "../store/entity/selectors";
import { useCallback } from "react";
import useEntity from "../store/entity/useEntity";

const useFormField = (id: string) => {
  const dispatch = useDispatch();
  const entityId = id?.split("_")[0];
  const fieldId = id?.split("_")[1];
  const { updateFormValue } = useEntity(entityId);
  const fieldValue = useSelector(
    selectFieldValue(entityId, fieldId),
    (left, right) => JSON.stringify(left ?? {}) === JSON.stringify(right ?? {})
  );

  const setFieldValue = useCallback(
    (value: any) => dispatch(updateFormValue(fieldId, value, entityId)),
    [dispatch, entityId, fieldId]
  );

  return {
    value: fieldValue,
    setFieldValue: setFieldValue,
  };
};

export default useFormField;
