import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { AnyType } from "common/types";
// import { API_URL } from "../../constants/envVariables";

export interface MenuState {
  expanded: boolean;
  selectedItemId: string;
  loading: boolean;
  menuItems: Array<any> | [];
  error: any;
}

export const MENU_ITEMS_API = "ui-configuration/menus/tree";

const initialState: MenuState = {
  expanded: false,
  selectedItemId: "",
  loading: false,
  menuItems: [],
  error: null,
};

// export const LoadMainMenu = createAsyncThunk("menuItems/LoadMainMenu", () => {
//   return axios
//     .get(`${API_URL}/${MENU_ITEMS_API}`)
//     .then((response) => response.data);
// });

export const menuSlice = createSlice({
  name: "MenuItems",
  initialState,
  reducers: {
    ToggleMainMenu: (state) => {
      state.expanded = !state.expanded;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(LoadMainMenu.pending, (state) => {
  //     state.loading = true;
  //   });
  //   builder.addCase(LoadMainMenu.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.menuItems = action.payload;
  //     state.error = initialState.error;
  //   });
  //   builder.addCase(LoadMainMenu.rejected, (state, action) => {
  //     state.loading = false;
  //     state.menuItems = initialState.menuItems;
  //     state.error = action.error.message;
  //   });
  // },
});

export const { ToggleMainMenu } = menuSlice.actions;

export default menuSlice.reducer;
