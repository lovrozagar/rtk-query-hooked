import {
  UseMutation,
  UseQuery,
} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  MutationDefinition,
  QueryDefinition,
} from "@reduxjs/toolkit/query";

/* QUERY */

type RTKQueryAnyHook = UseQuery<any>;

type RTKQueryHook<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType
> = UseQuery<QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>>;

const useQueryWrapper = <QueryArg, BaseQuery extends BaseQueryFn, ResultType>(
  useQueryHook: RTKQueryHook<QueryArg, BaseQuery, ResultType>
) => {
  // this is only used for advanced typing, hook should not ever be called
  return useQueryHook({} as any);
};

type UseQueryData<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType
> = ReturnType<typeof useQueryWrapper<QueryArg, BaseQuery, ResultType>>["data"];

/* MUTATION */

type RTKMutationAnyHook = UseMutation<any>;

type RTKMutationHook<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType
> = UseMutation<
  MutationDefinition<QueryArg, BaseQuery, string, ResultType, string>
>;

const useMutationWrapper = <
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType
>(
  useMutationHook: RTKMutationHook<QueryArg, BaseQuery, ResultType>
) => {
  // this is only used for advanced typing, hook should not ever be called
  return useMutationHook({} as any);
};

type UseMutationData<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType
> = ReturnType<
  typeof useMutationWrapper<QueryArg, BaseQuery, ResultType>
>[1]["data"];

/* HOOKED EVENTS */

type RTKHookedEvents<T> = {
  onSettled?: () => void;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
};

export type {
  RTKHookedEvents,
  RTKMutationAnyHook,
  RTKMutationHook,
  RTKQueryAnyHook,
  RTKQueryHook,
  UseMutationData,
  UseQueryData,
};
