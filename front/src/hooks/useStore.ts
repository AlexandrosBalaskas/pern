import { useSelector } from "react-redux";

const useStore = () => {
  const selectState = (state: any) => state || {};

  return {
    state: useSelector(selectState),
  };
};

export default useStore;
