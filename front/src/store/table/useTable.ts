import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadTable,
  InitTable,
  DeleteRow,
  SetPaginationIndex,
} from "./reducers";
import { AppDispatch } from "../store";
import {
  ApplyCriteria,
  ClearCriteria,
  SetFilterData,
  TriggerRefresh,
  ClearFilterData,
} from "./reducers";
import {
  selectCount,
  selectData,
  selectDelete,
  selectLoading,
  selectPaginationIndex,
  selectPaginationSize,
  selectSlice,
  selectTableCriteria,
} from "./selectors";

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
    // filterValue: useSelector(selectFilterDataValue(id), (left, right) => {
    //   return JSON.stringify(left || {}) === JSON.stringify(right || {});
    // }),
    deleteSw: useSelector(selectDelete(id), (left, right) => {
      return JSON.stringify(left || {}) === JSON.stringify(right || {});
    }),
    data: useSelector(selectData(id), (left, right) => {
      return JSON.stringify(left || {}) === JSON.stringify(right || {});
    }),
    count: useSelector(selectCount(id), (left, right) => {
      return JSON.stringify(left || {}) === JSON.stringify(right || {});
    }),
    loading: useSelector(selectLoading(id), (left, right) => {
      return JSON.stringify(left || {}) === JSON.stringify(right || {});
    }),
    paginationIndex: useSelector(selectPaginationIndex(id), (left, right) => {
      return JSON.stringify(left || {}) === JSON.stringify(right || {});
    }),
    paginationSize: useSelector(selectPaginationSize(id), (left, right) => {
      return JSON.stringify(left || {}) === JSON.stringify(right || {});
    }),
    setPagination: useCallback(
      ({ index, size }: { index: any; size: any }) =>
        dispatch(SetPaginationIndex({ tableId: id, index, size })),
      [dispatch]
    ),
    deleteRow: useCallback(
      (rowId: any) => dispatch(DeleteRow({ tableId: id, rowId })),
      [dispatch]
    ),
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
