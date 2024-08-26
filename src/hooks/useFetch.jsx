/* eslint-disable no-unused-vars */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function useFetch(api, queryKey) {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => GetData(),
  });
  async function GetData() {
    return axios.get(api);
  }

  return { data, isLoading, isError, error, isFetching };
}
