import type { RootState } from "../store";

export const selectMainMenuExpanded = (state: RootState) =>
  state.MenuItems.expanded;
export const selectMainMenuItems = (state: RootState) =>
  state.MenuItems.menuItems;
