import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axiosConfig";

export interface TablesState {
  [_: string]: TableState;
}

export type TableActions = {
  filterEntities?: boolean;
};

export type TableState = {
  id: string;
  count?: number;
  data?: Array<any>;
  loading: boolean;
  deleteSw?: boolean;
  error: { [key: string]: any };
  criteria: { [key: string]: any };
  filterData: { [key: string]: any };
  predefinedCriteria: { [key: string]: any };
  loadTimestamp: number;
};

const initialState: TablesState = {};

const getPredefinedCriteria = (all: any = {}, predefined: any = {}) => {
  const predefinedCriteria = { ...predefined };
  const allKeys = Object.keys(all || {});

  allKeys.forEach((key) => {
    if (predefined[key]) {
      predefinedCriteria[key] = all[key];
    }
  });
  return predefinedCriteria;
};

const settingTables = (
  state: any,
  action: any,
  tableReducer: (state: any, action: any) => {}
) => {
  const { payload, meta } = action;
  const tableId = payload?.tableId || meta?.arg?.tableId;
  if (!tableId) {
    return state;
  }
  return {
    ...state,
    [tableId]: {
      ...(state[tableId] || { id: tableId }),
      ...tableReducer(state[tableId], action),
    },
  };
};

export const DeleteRow = createAsyncThunk(
  "Entities/DeleteRow",
  ({ tableId, rowId }: any, { getState }) => {
    return api({
      method: "delete",
      url: `${tableId}/${rowId}`,
    }).then((response) => {
      return { response };
    });
  }
);

export const LoadTable = createAsyncThunk(
  "Tables/LoadTable",
  ({ pageId, url, params, data, method, headers, tableId }: any) => {
    return api({
      method: "get",
      url: `${pageId}`,
      params,
    }).then((response) => {
      return { data: response.data };
    });
  }
);

export const entitySlice = createSlice({
  name: "Tables",
  initialState,
  reducers: {
    InitTable: (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        ...action.payload.initialState,
      }));
    },
    ApplyCriteria: (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        criteria: { ...action.payload.criteria },
        filterData: { ...action.payload.criteria },
        predefinedCriteria: getPredefinedCriteria(
          action.payload.criteria,
          state.predefinedCriteria
        ),
        pagination: {
          ...state.pagination,
          requestedPageNumber: 0,
          currentPageNumber: 0,
        },
      }));
    },
    ClearCriteria: (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        criteria: { ...state.predefinedCriteria },
        filterData: { ...state.predefinedCriteria },
        pagination: {
          ...state.pagination,
          currentPageNumber: 0,
        },
      }));
    },
    SetFilterData: (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        filterData: { ...action.payload.filterData },
      }));
    },
    ClearFilterData: (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        filterData: { ...state.predefinedCriteria },
      }));
    },
    TriggerRefresh: (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        pagination: {
          ...state.pagination,
          requestedPageNumber: 0,
          currentPageNumber: 0,
        },
        localData: [],
        refresh: new Date().getTime(),
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoadTable.pending, (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        loading: true,
      }));
    });
    builder.addCase(LoadTable.fulfilled, (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        loading: false,
        ...action.payload.data,
      }));
    });
    builder.addCase(LoadTable.rejected, (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
    });
    builder.addCase(DeleteRow.pending, (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        loading: true,
      }));
    });
    builder.addCase(DeleteRow.fulfilled, (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        loading: false,
        deleteSw: !state.deleteSw,
      }));
    });
    builder.addCase(DeleteRow.rejected, (state, action) => {
      return settingTables(state, action, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
    });
  },
});

export const {
  ApplyCriteria,
  ClearCriteria,
  SetFilterData,
  TriggerRefresh,
  ClearFilterData,
  InitTable,
} = entitySlice.actions;

export default entitySlice.reducer;
