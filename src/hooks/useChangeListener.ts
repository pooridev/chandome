import { useEffect, useRef } from "react";

const useChangeListener = <TEffect extends Function, TDeps extends unknown[]>(effect: TEffect, deps: TDeps) => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    effect();
  }, deps);
};

export default useChangeListener;
