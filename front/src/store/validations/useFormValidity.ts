import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch } from "../store";
import { selectIsFormValid } from "./selectors";

const useFormValidity = (parentField: string) => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    isFormValid: useSelector(selectIsFormValid(parentField || "")),
  };
};

export default useFormValidity;
