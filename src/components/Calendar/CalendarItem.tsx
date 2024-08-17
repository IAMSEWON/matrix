import React from 'react';
import { Dimensions, View } from 'react-native';
import dayjs from 'dayjs';

import { IDayItem } from '@/constants';
import { cn } from '@/utils/tailwind';

import CalendarWeekRow from './CalendarWeekRow';
import Day from './Day';

interface IProps {
  date: string;
  currentDate: Date;
  onPressDay: (date: Date) => void;
}

const SCREEN_WIDTH = Dimensions.get('screen').width - 16;
const CalendarItem = ({ date, currentDate, onPressDay }: IProps) => {
  const thisMonth = dayjs(date).clone();
  // 주별 아이템 리스트
  const initDates = React.useMemo(() => {
    // 전달 말일 구하기
    const prevMonthLastDate = thisMonth.subtract(1, 'month').daysInMonth();
    // 이번달 1일 요일 구하기
    const thisMonthFirstDay = thisMonth.day();
    // 이번달 1일 요일 구하기
    const thisMonthLastDay = thisMonth.daysInMonth();
    // 전체 일자 배열
    const wholeDateArr: IDayItem[] = [];
    const wholeDateLength = 42;

    for (let i = 1; i < thisMonthFirstDay + 1; i++) {
      wholeDateArr.push({
        yearMonth: thisMonth.subtract(1, 'month').format('YYYYMM'),
        date: prevMonthLastDate - thisMonthFirstDay + i,
        type: 'prev',
      });
    }
    for (let i = 1; i < thisMonthLastDay + 1; i++) {
      wholeDateArr.push({ yearMonth: thisMonth.format('YYYYMM'), date: i, type: 'this' });
    }
    const untilThisMonthLength = wholeDateArr.length;
    if (untilThisMonthLength < wholeDateLength) {
      for (let j = 1; j < wholeDateLength - untilThisMonthLength + 1; j++) {
        wholeDateArr.push({ yearMonth: thisMonth.add(1, 'month').format('YYYYMM'), date: j, type: 'next' });
      }
    }
    const formatWeekDateArr = [];
    for (let i = 0; i < 6; i++) {
      formatWeekDateArr.push(wholeDateArr.splice(0, 7));
    }
    return formatWeekDateArr;
  }, []);

  const onPressDayItem = React.useCallback((item: { date: number; type: 'prev' | 'this' | 'next' }) => {
    if (item.type === 'prev') {
      onPressDay(new Date(dayjs(date).clone().subtract(1, 'month').set('date', item.date).toDate()));
    } else if (item.type === 'next') {
      onPressDay(new Date(dayjs(date).clone().add(1, 'month').set('date', item.date).toDate()));
    } else {
      onPressDay(new Date(dayjs(date).clone().set('date', item.date).toDate()));
    }
  }, []);

  return (
    <View className={cn(`items-center`)} style={{ width: SCREEN_WIDTH }}>
      <View className="flex-row">
        <CalendarWeekRow />
      </View>
      <View>
        {initDates.map((w, _w) => {
          return (
            <View key={`${date}-${_w + 1}week`} className={cn(`flex-row`)}>
              {w.map((d) => {
                return (
                  <Day
                    key={`${date}-${_w + 1}week_${d.date}`}
                    date={date}
                    item={d}
                    onPress={onPressDayItem}
                    currentDate={currentDate}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(CalendarItem, (prevProps, nextProps) => {
  // 날짜가 변경된 경우, 지난달과 변경된달을 제외하고 메모이징, 지난달은 선택했던 날짜 해제하기 위해 리렌더링
  const prevNextMonthDiff = Math.round(
    dayjs(prevProps.date).set('date', 1).diff(dayjs(nextProps.currentDate).set('date', 1), 'month', true),
  );
  // 과거로 변경된 경우
  if (prevProps.currentDate > nextProps.currentDate) {
    return prevNextMonthDiff !== 1 && prevNextMonthDiff !== 0;
  } // 미래로 변경된 변경
  return prevNextMonthDiff !== -1 && prevNextMonthDiff !== 0;
});
