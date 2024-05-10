import { createSelector } from "reselect";
import { DrawerState } from "./reducers";

export const selectDrawerState = (state: { Drawer: DrawerState }) =>
  state.Drawer;
export const selectIsOpen = () =>
  createSelector(selectDrawerState, (state) => state.drawerId);
