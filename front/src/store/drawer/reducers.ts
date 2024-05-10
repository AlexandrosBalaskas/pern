import { createSlice } from "@reduxjs/toolkit";

export type DrawerState = { [key: string]: boolean };

export type UseDrawerType = {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const defaultState: DrawerState = { drawerId: true };

console.log(defaultState, "defaultStare");

export const drawerSlice = createSlice({
  name: "Drawer",
  initialState: defaultState,
  reducers: {},
});

export default drawerSlice.reducer;
