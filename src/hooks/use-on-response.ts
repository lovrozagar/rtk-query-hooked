import { useEffect } from "react";
import { useFreshRef } from "./use-fresh-ref";
import { RTKHookedEvents } from "../types/types";

type UseOnResponseProps<T> = {
  responseData: T;
  responseIsSucceess: boolean;
  responseIsError: boolean;
  responseError: unknown | undefined;
} & RTKHookedEvents<T>;

function useOnResponse<T>(props: UseOnResponseProps<T>) {
  const {
    responseData,
    responseIsSucceess,
    responseIsError,
    responseError,
    onSettled,
    onSuccess,
    onError,
  } = props;

  const responseDataRef = useFreshRef(responseData);
  const onSettledRef = useFreshRef(onSettled);
  const onSuccessRef = useFreshRef(onSuccess);
  const onErrorRef = useFreshRef(onError);
  const errorRef = useFreshRef(responseError);

  /* events */

  useEffect(() => {
    if (!onSettledRef.current || !(responseIsSucceess || responseIsError))
      return;

    onSettledRef.current();
  }, [responseIsSucceess, responseIsError]);

  useEffect(() => {
    if (!onSuccessRef.current || !responseIsSucceess) return;

    onSuccessRef.current(responseDataRef.current as T);
  }, [responseIsSucceess]);

  useEffect(() => {
    if (!onErrorRef.current || !responseIsError) return;

    onErrorRef.current(errorRef.current);
  }, [responseIsError]);
}

export { useOnResponse };
