import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { LoadCodelist } from "./reducers";
import { AppDispatch } from "../store";
import {} from "./reducers";
import { selectItems } from "./selectors";

const useCodelist = (codelistId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    items: useSelector(selectItems(codelistId), shallowEqual),
    loadCodelist: useCallback(
      ({ codelistId, url, params, data, method, headers, tableId }: any) =>
        dispatch(
          LoadCodelist({
            codelistId,
            url,
            params,
            data,
            method,
            headers,
            tableId,
          })
        ),
      [dispatch]
    ),
  };
};

export default useCodelist;
