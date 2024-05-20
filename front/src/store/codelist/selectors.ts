import { CodelistState } from "./reducers";

export type ReduxTablesState = {
  Tables: {
    [key: string]: CodelistState;
  };
};

export const selectSlice =
  (id: string) =>
  (state: any): CodelistState =>
    state.Codelists[id] || {};

export const selectItems = (id: string) => (state: any) =>
  selectSlice(id)(state)?.data?.items;
