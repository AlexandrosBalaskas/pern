import { useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { LoadChart } from "./reducers";
import { AppDispatch } from "../store";
import {} from "./reducers";
import { selectItems } from "./selectors";

const useCharts = (chartId: string) => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    items: useSelector(selectItems(chartId), shallowEqual),
    loadChart: useCallback(
      () =>
        dispatch(
          LoadChart({
            chartId,
          })
        ),
      [dispatch]
    ),
  };
};

export default useCharts;
