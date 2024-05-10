import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import useDrawer from "../store/drawer/useDrawer";
export const InitialTwo = () => {
  const arr: any = [];
  const [data, setData] = useState(arr);
  const { open } = useDrawer();
  console.log(open, "ISOPEN?????????");
  useEffect(() => {
    api({
      method: "get", //you can set what request you want to be
      url: "/accounts",
      params: { filters: "" },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response: any) => {
      setData(response?.data?.data);
      return response;
    });
  }, []);

  const addme = () => {
    api({
      method: open ? "post" : "put", //you can set what request you want to be
      url: "/accounts",
      data: {
        accountName: open,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      111111111111dadasdasdasfasfsdfds {JSON.stringify(data)}
      <button onClick={addme}>ADD3232432432</button>
    </div>
  );
};
