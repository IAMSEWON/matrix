import React from 'react';
import dayjs from 'dayjs';

export function sameDate(a: Date, b: Date) {
  if (!dayjs(a).isValid() || !dayjs(b).isValid()) {
    return false;
  }

  return a?.getFullYear() === b?.getFullYear() && a?.getMonth() === b?.getMonth() && a?.getDate() === b?.getDate();
}
export function sameMonth(a: Date, b: Date) {
  if (!dayjs(a).isValid() || !dayjs(b).isValid()) {
    return false;
  }

  return a?.getFullYear() === b?.getFullYear() && a?.getMonth() === b?.getMonth();
}

export const useDidUpdate = (callback: React.EffectCallback, dep: React.DependencyList) => {
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMounted.current) {
      callback();
    } else {
      isMounted.current = true;
    }
  }, dep);
};
