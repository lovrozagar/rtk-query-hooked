import { useMemo } from "react";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { RTKQueryHook, RTKHookedEvents, UseQueryData } from "../types/types";
import { useOnResponse } from "./use-on-response";

type UseQueryProps<QueryArg, BaseQuery extends BaseQueryFn, ResultType> = {
  hook: RTKQueryHook<QueryArg, BaseQuery, ResultType>;
  request:
    | Parameters<RTKQueryHook<QueryArg, BaseQuery, ResultType>>[0]
    | (() => Parameters<RTKQueryHook<QueryArg, BaseQuery, ResultType>>[0]);
  options?:
    | Parameters<RTKQueryHook<QueryArg, BaseQuery, ResultType>>[1]
    | (() => Parameters<RTKQueryHook<QueryArg, BaseQuery, ResultType>>[1]);
} & RTKHookedEvents<UseQueryData<QueryArg, BaseQuery, ResultType>>;

function useQuery<QueryArg, BaseQuery extends BaseQueryFn, ResultType>(
  props: UseQueryProps<QueryArg, BaseQuery, ResultType>
) {
  const { hook, options, request, onSettled, onSuccess, onError } = props;

  const response = hook(
    options as Parameters<typeof hook>[0],
    request as Parameters<typeof hook>[1]
  );

  /* prevent error from happening, in case response is void, fallback to empty object */
  const memoResponse = useMemo(() => response ?? {}, [response]);

  useOnResponse({
    responseData: response.data,
    responseIsSucceess: memoResponse.isSuccess,
    responseIsError: memoResponse.isError,
    responseError: memoResponse.error,
    onSettled,
    onSuccess,
    onError,
  });

  return response;
}

type UseQueryReturn = ReturnType<typeof useQuery>;

export { useQuery };

export type { UseQueryReturn };
