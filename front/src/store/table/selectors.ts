import { TableState } from "./reducers";

export type ReduxTablesState = {
  Tables: {
    [key: string]: TableState;
  };
};

export const selectSlice =
  (id: string) =>
  (state: any): TableState =>
    state.Tables[id] || {};

export const selectTableCriteria =
  (id: string) => (state: ReduxTablesState) => {
    const criteria = selectSlice(id)(state)?.criteria || {};
    const predefinedCriteria = selectSlice(id)(state)?.predefinedCriteria || {};
    return {
      ...predefinedCriteria,
      ...criteria,
    };
  };

export const selectData = (id: string) => (state: ReduxTablesState) =>
  selectSlice(id)(state)?.data || [];

export const selectCount = (id: string) => (state: ReduxTablesState) =>
  selectSlice(id)(state)?.count || 0;

export const selectLoading = (id: string) => (state: ReduxTablesState) =>
  selectSlice(id)(state)?.loading;

export const selectDelete = (id: string) => (state: ReduxTablesState) =>
  selectSlice(id)(state)?.deleteSw;
