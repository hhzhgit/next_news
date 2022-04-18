import axios from "axios";
import { useState } from "react";
import logIfDev from "./logIfDev";
import { useRouter } from "next/router";
export const requestSuccessed = "RequestSuccessed";
export const requestFaild = "requestFaild";
export default function useFetchData(init) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(init);
  const [error, setError] = useState(null);
  const request = async (
    endPoint,
    {
      method,
      body,
      query,
      jwt,
      onSuccess,
      onFail,
      navigate,
      refreshData = true,
      refreshError = true,
    } = {}
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.request({
        url: process.env.NEXT_PUBLIC_SERVER_BASE_URL + endPoint,
        method: method || "GET",
        data: body,
        params: query,
        headers: { authorization: jwt ? `Bearer ${jwt}` : "" },
      });
      refreshData && setData(data);
      setError(null);
      onSuccess && onSuccess(data);
      setLoading(false);
      navigate && router.push(navigate);
      return { status: requestSuccessed, data };
    } catch (error) {
      const errMsg =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        "server side error";
      logIfDev(error.response, "fetch Data hook");
      refreshError && setError(error);
      setData(init);
      onFail && onFail(errMsg);
      setLoading(false);
      return { status: requestFaild, error };
    }
  };
  return { loading, data, error, request, setData };
}
export const fetcher =
  (endPoint, { method, body, query, jwt } = {}) =>
  async () =>
    await axios.request({
      url: process.env.NEXT_PUBLIC_SERVER_BASE_URL + endPoint,
      method: method || "GET",
      data: body,
      params: query,
      headers: { authentication: `Bearer ${jwt}` },
    });
export const fetcherByKey = async (endPoint, options) => {
  const { body, query, method, jwt } = options || {};
  return await axios.request({
    url: process.env.NEXT_PUBLIC_SERVER_BASE_URL + endPoint,
    method: method || "GET",
    data: body,
    params: query,
    headers: { authentication: `Bearer ${jwt}` },
  });
};
