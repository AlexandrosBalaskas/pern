import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadTable, InitTable } from "./reducers";
import { AppDispatch } from "../store";
import {
  ApplyCriteria,
  ClearCriteria,
  SetFilterData,
  TriggerRefresh,
  ClearFilterData,
} from "./reducers";
import { selectCount, selectData, selectTableCriteria } from "./selectors";

const useTable = (id: string) => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    initTable: useCallback(
      (initialState: any) => dispatch(InitTable({ tableId: id, initialState })),
      [dispatch]
    ),
    loadTable: useCallback(
      ({ pageId, url, params, data, method, headers, tableId }: any) =>
        dispatch(
          LoadTable({ pageId, url, params, data, method, headers, tableId })
        ),
      [dispatch]
    ),
    criteria: useSelector(selectTableCriteria(id), (left, right) => {
      return JSON.stringify(left || {}) === JSON.stringify(right || {});
    }),
    data: useSelector(selectData(id), (left, right) => {
      return JSON.stringify(left || {}) === JSON.stringify(right || {});
    }),
    count: useSelector(selectCount(id), (left, right) => {
      return JSON.stringify(left || {}) === JSON.stringify(right || {});
    }),

    applyCriteria: useCallback(
      (criteria: any) => dispatch(ApplyCriteria({ tableId: id, criteria })),
      [dispatch, id]
    ),
    clearCriteria: useCallback(
      () => dispatch(ClearCriteria({ tableId: id })),
      [dispatch, id]
    ),
    setFilterData: useCallback(
      (filterData: { [key: string]: any }) =>
        dispatch(SetFilterData({ tableId: id, filterData })),
      [dispatch, id]
    ),
    clearFilterData: useCallback(
      () => dispatch(ClearFilterData({ tableId: id })),
      [dispatch, id]
    ),
    triggerRefresh: useCallback(
      () => dispatch(TriggerRefresh({ tableId: id })),
      [dispatch, id]
    ),
  };
};

export default useTable;
