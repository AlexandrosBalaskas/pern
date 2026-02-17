import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axiosConfig";

export interface CodelistsState {
  [_: string]: CodelistState;
}

export type CodelistState = {
  data?: any;
};

const initialState: CodelistState = {};

const settingCodelists = (
  state: any,
  action: any,
  tableReducer: (state: any, action: any) => {},
) => {
  const { payload, meta } = action;
  const codelistId = payload?.codelistId || meta?.arg?.codelistId;
  if (!codelistId) {
    return state;
  }
  return {
    ...state,
    [codelistId]: {
      ...(state[codelistId] || { id: codelistId }),
      ...tableReducer(state[codelistId], action),
    },
  };
};

export const LoadCodelist = createAsyncThunk(
  "Codelists/LoadCodelist",
  ({ codelistId, url, params, data, method, headers, tableId }: any) => {
    return api({
      method: "get",
      url: `lookups?type=${codelistId}CL`,
      params: "",
    }).then((response) => {
      return { data: response.data };
    });
  },
);

export const entitySlice = createSlice({
  name: "Codelists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoadCodelist.pending, (state, action) => {
      return settingCodelists(state, action, (state, action) => ({
        ...state,
        loading: true,
      }));
    });
    builder.addCase(LoadCodelist.fulfilled, (state, action) => {
      return settingCodelists(state, action, (state, action) => ({
        ...state,
        loading: false,
        data: { ...action.payload.data },
      }));
    });
    builder.addCase(LoadCodelist.rejected, (state, action) => {
      return settingCodelists(state, action, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
    });
  },
});

// export const { InitTable } = entitySlice.actions;

export default entitySlice.reducer;
