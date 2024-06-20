import { MutableRefObject, useEffect, useRef } from "react";

function useFreshRef<T>(input: T): MutableRefObject<T> {
  const ref = useRef<T>(input);

  useEffect(() => {
    ref.current = input;
  }, [input]);

  return ref;
}

export { useFreshRef };
