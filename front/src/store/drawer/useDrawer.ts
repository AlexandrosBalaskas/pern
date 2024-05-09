import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpenDrawer, CloseDrawer } from "./reducers";
import { selectIsOpen } from "./selectors";

const useDrawer = (id: string): any => {
  const dispatch = useDispatch();

  return {
    open: useSelector(selectIsOpen(id)),
    openDrawer: useCallback(() => dispatch(OpenDrawer({ id })), [dispatch, id]),
    closeDrawer: useCallback(
      () => dispatch(CloseDrawer({ id })),
      [dispatch, id]
    ),
  };
};
export default useDrawer;
