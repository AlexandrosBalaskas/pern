import { useMemo } from "react";
import { resolveSourceData } from "./utils";
import useStore from "./useStore";

const useFormData = (widgetId: string, source: any) => {
  const { state } = useStore();

  const value = useMemo(() => {
    if (!source) return null;
    return resolveSourceData(widgetId, state, source);
  }, [state, source]);

  return value;
};

export default useFormData;
