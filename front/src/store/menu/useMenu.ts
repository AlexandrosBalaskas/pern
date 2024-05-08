import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMainMenuExpanded, selectMainMenuItems } from "./selectors";
import { ToggleMainMenu } from "./reducers";
import { AppDispatch } from "../store";

const useMenu = () => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    expanded: useSelector(selectMainMenuExpanded),
    menuItems: useSelector(selectMainMenuItems),
    toggleMainMenu: useCallback(() => dispatch(ToggleMainMenu()), [dispatch]),
    // loadMainMenu: useCallback(() => dispatch(LoadMainMenu()), [dispatch]),
  };
};

export default useMenu;
