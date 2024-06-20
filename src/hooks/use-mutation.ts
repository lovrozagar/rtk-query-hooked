import { useMemo } from "react";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import {
  RTKHookedEvents,
  RTKMutationHook,
  UseMutationData,
} from "../types/types";
import { useOnResponse } from "./use-on-response";

type UseMutationProps<QueryArg, BaseQuery extends BaseQueryFn, ResultType> = {
  hook: RTKMutationHook<QueryArg, BaseQuery, ResultType>;
} & RTKHookedEvents<UseMutationData<QueryArg, BaseQuery, ResultType>>;

function useMutation<QueryArg, BaseQuery extends BaseQueryFn, ResultType>(
  props: UseMutationProps<QueryArg, BaseQuery, ResultType>
) {
  const { hook, onSettled, onSuccess, onError } = props;

  const [trigger, response] = hook();

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

  return [trigger, response] as const;
}

type UseMutationReturn = ReturnType<typeof useMutation>;

export { useMutation };

export type { UseMutationReturn };
