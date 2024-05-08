import { createSlice } from "@reduxjs/toolkit";

export type DrawerState = { [key: string]: boolean };

export type UseDrawerType = {
  open: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const defaultState: DrawerState = {};

export const drawerSlice = createSlice({
  name: "Drawer",
  initialState: defaultState,
  reducers: {
    OpenDrawer: (state, action) => {
      state[action.payload.id] = true;
    },
    CloseDrawer: (state, action) => {
      state[action.payload.id] = false;
    },
  },
});

export const { OpenDrawer, CloseDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
