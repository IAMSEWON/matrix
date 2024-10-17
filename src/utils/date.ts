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

export const getDayText = (day: number) => {
  if (day === 0) return '일';
  if (day === 1) return '월';
  if (day === 2) return '화';
  if (day === 3) return '수';
  if (day === 4) return '목';
  if (day === 5) return '금';
  if (day === 6) return '토';
  return '';
};
