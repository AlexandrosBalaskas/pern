import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpenDrawer, CloseDrawer, UseDrawerType } from "./reducers";
import { selectIsOpen } from "./selectors";

export default (id: string): UseDrawerType => {
  const dispatch = useDispatch();

  return <UseDrawerType>{
    open: useSelector(selectIsOpen(id)),
    openDrawer: useCallback(() => dispatch(OpenDrawer({ id })), [dispatch]),
    closeDrawer: useCallback(() => dispatch(CloseDrawer({ id })), [dispatch]),
  };
};
