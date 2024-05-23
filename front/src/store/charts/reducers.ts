import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../axiosConfig";

export interface ChartsState {
  [_: string]: ChartState;
}

export type ChartState = {
  data?: any;
};

const initialState: ChartState = {};

const settingCharts = (
  state: any,
  action: any,
  tableReducer: (state: any, action: any) => {}
) => {
  const { payload, meta } = action;
  const chartId = payload?.chartId || meta?.arg?.chartId;
  if (!chartId) {
    return state;
  }
  return {
    ...state,
    [chartId]: {
      ...(state[chartId] || { id: chartId }),
      ...tableReducer(state[chartId], action),
    },
  };
};

export const LoadChart = createAsyncThunk(
  "Charts/LoadChart",
  ({ chartId }: any) => {
    return api({
      method: "get",
      url: chartId,
      params: "",
    }).then((response) => {
      return { data: response.data };
    });
  }
);

export const entitySlice = createSlice({
  name: "Charts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoadChart.pending, (state, action) => {
      return settingCharts(state, action, (state, action) => ({
        ...state,
        loading: true,
      }));
    });
    builder.addCase(LoadChart.fulfilled, (state, action) => {
      return settingCharts(state, action, (state, action) => ({
        ...state,
        loading: false,
        data: { ...action.payload.data },
      }));
    });
    builder.addCase(LoadChart.rejected, (state, action) => {
      return settingCharts(state, action, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
    });
  },
});

export default entitySlice.reducer;
