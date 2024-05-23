import { ChartState } from "./reducers";

export type ReduxTablesState = {
  Tables: {
    [key: string]: ChartState;
  };
};

export const selectSlice =
  (id: string) =>
  (state: any): ChartState =>
    state.Charts[id] || {};

export const selectItems = (id: string) => (state: any) =>
  selectSlice(id)(state)?.data;
