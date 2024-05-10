import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UseDrawerType } from "./reducers";
import { selectIsOpen } from "./selectors";

const useDrawer = (): UseDrawerType => {
  const dispatch = useDispatch();

  return <UseDrawerType>{
    open: useSelector(selectIsOpen()),
  };
};
export default useDrawer;
