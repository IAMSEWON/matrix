import React from 'react';
import { Dimensions, View } from 'react-native';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import dayjs from 'dayjs';

import { CalendarType, IDayItem } from '@/constants';
import { cn } from '@/utils/tailwind';

import CalendarWeekRow from './CalendarWeekRow';
import Day from './Day';

interface IProps {
  date: string;
  currentDate: Date;
  onPressDay: (date: Date) => void;
  calendarType: CalendarType;
  setCalendarType: React.Dispatch<React.SetStateAction<CalendarType>>;
}

const SCREEN_WIDTH = Dimensions.get('screen').width - 16;
const ListItem = ({ date, currentDate, onPressDay, calendarType, setCalendarType }: IProps) => {
  // console.log('render ListItem!!!!! date', date);
  const thisMonth = dayjs(date).clone();
  // 월별 캘린더 주 아이템 리스트
  const initMonthDates = React.useMemo(() => {
    // 전달 말일 구하기
    const prevMonthLastDate = thisMonth.clone().subtract(1, 'month').daysInMonth();
    // 이번달 1일 요일 구하기
    const thisMonthFirstDay = thisMonth.clone().date(1).day();
    // 이번달 말일 일자 구하기
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

  const initWeekDates = React.useMemo(() => {
    const startDate = dayjs(date).startOf('week'); // 해당 주 일요일
    const weekList: IDayItem[] = [];
    for (let i = 0; i < 7; i++) {
      const day = dayjs(startDate).add(i, 'day'); // 일요일 부터 토요일 까지
      let type: 'prev' | 'this' | 'next' = 'this';
      if (dayjs(currentDate).format('YYYYMM') !== day.clone().format('YYYYMM')) {
        // 주아이템(date)와 요일 아이템의 월이 다른 경우
        const currentMonth = dayjs(currentDate).year() * 12 + dayjs(currentDate).month();
        const dayMonth = day.year() * 12 + day.month();
        if (dayMonth - currentMonth < 0) {
          type = 'prev';
        }
        if (dayMonth - currentMonth > 0) {
          type = 'next';
        }
      }
      weekList.push({
        yearMonth: day.clone().format('YYYYMM'),
        type,
        date: day.date(),
      });
    }
    return weekList;
  }, [currentDate]);

  const onPressDayItem = React.useCallback(
    (item: { date: number; type: 'prev' | 'this' | 'next'; yearMonth: string }) => {
      if (calendarType === 'month') {
        if (item.type === 'prev') {
          onPressDay(new Date(dayjs(date).clone().subtract(1, 'month').set('date', item.date).toDate()));
        } else if (item.type === 'next') {
          onPressDay(new Date(dayjs(date).clone().add(1, 'month').set('date', item.date).toDate()));
        } else {
          onPressDay(new Date(dayjs(date).clone().set('date', item.date).toDate()));
        }
      }
      if (calendarType === 'week') {
        const year = item.yearMonth.substring(0, 4);
        const month = item.yearMonth.substring(4, 6);
        onPressDay(new Date(dayjs(`${year}-${month}-${item.date < 10 ? `0${item.date}` : item.date}`).toDate()));
      }
    },
    [calendarType],
  );

  const dayItemHeight = ((SCREEN_WIDTH / 7) * 3) / 5;
  const startTranslateY = useSharedValue(0);
  const weekViewHeight = useSharedValue(dayItemHeight);
  const fling = Gesture.Fling()
    // eslint-disable-next-line no-bitwise
    .direction(Directions.UP | Directions.DOWN)
    .onBegin((event) => {
      startTranslateY.value = event.y;
    })
    .onStart((event) => {
      if (startTranslateY.value < event.y) {
        setCalendarType('month');
        weekViewHeight.value = withTiming(dayItemHeight, { duration: 100 });
      } else {
        setCalendarType('week');
        weekViewHeight.value = withTiming(0, { duration: 100 });
      }
    })
    .runOnJS(true);
  const weekViewAnimatedStyle = useAnimatedStyle(() => ({
    height: weekViewHeight.value,
  }));

  return (
    <GestureDetector gesture={fling}>
      <Animated.View className={cn(`items-center`)} style={[{ width: SCREEN_WIDTH }]}>
        <View className="flex-row">
          <CalendarWeekRow />
        </View>
        {calendarType === 'month' ? (
          <View>
            {initMonthDates.map((w, _w) => {
              const isCurrentWeek = w.find((i) => i.type === 'this' && i.date === dayjs(currentDate).date());
              return (
                <Animated.View
                  key={`${date}-${_w + 1}week`}
                  className={cn(`flex-row overflow-hidden`)}
                  style={isCurrentWeek === undefined ? weekViewAnimatedStyle : {}}
                >
                  {w.map((d) => {
                    return (
                      <Day
                        key={`${date}-${_w + 1}week_${d.date}`}
                        item={d}
                        onPress={onPressDayItem}
                        currentDate={currentDate}
                        calendarType={calendarType}
                      />
                    );
                  })}
                </Animated.View>
              );
            })}
          </View>
        ) : (
          <Animated.View className={cn(`flex-row overflow-hidden`)}>
            {initWeekDates.map((w, _w) => {
              return (
                <Day
                  key={`${date}-${_w + 1}week_${w.date}`}
                  item={w}
                  onPress={onPressDayItem}
                  currentDate={currentDate}
                  calendarType={calendarType}
                />
              );
            })}
          </Animated.View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default React.memo(ListItem, (prevProps, nextProps) => {
  // 날짜가 변경된 경우, 지난달과 변경된달을 제외하고 메모이징, 지난달은 선택했던 날짜 해제하기 위해 리렌더링
  if (prevProps.calendarType !== nextProps.calendarType) {
    return false;
  }
  if (nextProps.calendarType === 'month') {
    const prevNextMonthDiff = Math.round(
      dayjs(prevProps.date).set('date', 1).diff(dayjs(nextProps.currentDate).set('date', 1), 'month', true),
    );
    // 과거로 변경된 경우
    if (prevProps.currentDate > nextProps.currentDate) {
      return prevNextMonthDiff !== 1 && prevNextMonthDiff !== 0;
    } // 미래로 변경된 변경
    return prevNextMonthDiff !== -1 && prevNextMonthDiff !== 0;
  }
  const prevDay = dayjs(prevProps.date).day();
  const formatPrevDate = dayjs(prevProps.date).clone().subtract(prevDay, 'd');
  const currentDay = dayjs(nextProps.currentDate).day();
  const formatCurrentDate = dayjs(nextProps.currentDate).clone().subtract(currentDay, 'd');
  const prevNextMonthDiff = Math.round(dayjs(formatPrevDate).diff(dayjs(formatCurrentDate), 'week', true));
  // 과거로 변경된 경우
  if (prevProps.currentDate > nextProps.currentDate) {
    return prevNextMonthDiff > 5 && prevNextMonthDiff < 0;
  } // 미래로 변경된 변경
  return prevNextMonthDiff < -5 && prevNextMonthDiff > 0;
});
