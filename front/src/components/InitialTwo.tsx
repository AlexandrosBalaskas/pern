import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
export const InitialTwo = () => {
  const arr: any = [];
  const [data, setData] = useState(arr);
  useEffect(() => {
    api({
      method: "get", //you can set what request you want to be
      url: "/accounts",
      params: { filters: "" },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response: any) => {
      console.log(response);
      setData(response?.data?.data);
      return response;
    });
  }, []);
  console.log(data, "data");

  return <div>111111111111dadasdasdasfasfsdfds {JSON.stringify(data)}</div>;
};
