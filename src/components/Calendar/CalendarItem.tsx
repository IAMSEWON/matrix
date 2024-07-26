import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import dayjs from 'dayjs';

import { IDayItem } from '@/constants';
import { cn } from '@/utils/tailwind';

import Day from './Day';

interface IProps {
  date: string;
  currentDate: Date;
  onPressDay: (date: Date) => void;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const SCREEN_WIDTH = Dimensions.get('screen').width - 16;
// 현재 년도 기준 앞뒤로 5년 까지만 생성
// 월/주별 토글 기능
// 토글 시 앞뒤 컴포넌트 생성
// 스와이프 시 월/주 변경, 해당 첫번째 일자 포커싱
const CalendarItem = ({ date, currentDate, onPressDay }: IProps) => {
  // 주별 아이템 리스트
  const [dates, setDates] = React.useState<IDayItem[][]>([]);

  const initDates = React.useCallback(() => {
    try {
      // 전달 말일 구하기
      const prevMonthLastDate = dayjs(date).subtract(1, 'month').daysInMonth();
      // 이번달 1일 요일 구하기
      const thisMonthFirstDay = dayjs(date).day();
      // 이번달 1일 요일 구하기
      const thisMonthLastDay = dayjs(date).daysInMonth();
      // 전체 일자 배열
      const wholeDateArr: { date: number; type: 'prev' | 'this' | 'next' }[] = [];
      const wholeDateLength = 42;

      for (let i = 1; i < thisMonthFirstDay + 1; i++) {
        wholeDateArr.push({ date: prevMonthLastDate - thisMonthFirstDay + i, type: 'prev' });
      }
      for (let i = 1; i < thisMonthLastDay + 1; i++) {
        wholeDateArr.push({ date: i, type: 'this' });
      }
      const untilThisMonthLength = wholeDateArr.length;
      if (untilThisMonthLength < wholeDateLength) {
        for (let j = 1; j < wholeDateLength - untilThisMonthLength + 1; j++) {
          wholeDateArr.push({ date: j, type: 'next' });
        }
      }
      const formatWeekDateArr = [];
      for (let i = 0; i < 6; i++) {
        formatWeekDateArr.push(wholeDateArr.splice(0, 7));
      }
      setDates(formatWeekDateArr);
    } catch (err) {
      // console.log('err', err);
    }
  }, []);

  const onPressDayItem = React.useCallback((item: { date: number; type: 'prev' | 'this' | 'next' }) => {
    if (item.type === 'prev') {
      onPressDay(dayjs(date).clone().set('date', item.date).subtract(1, 'month').toDate());
    } else if (item.type === 'next') {
      onPressDay(dayjs(date).clone().set('date', item.date).add(1, 'month').toDate());
    } else {
      onPressDay(dayjs(date).clone().set('date', item.date).toDate());
    }
  }, []);

  React.useEffect(() => {
    initDates();
  }, []);

  const formatCurrentDate = dayjs(currentDate).clone().format('YYYYMMDD');

  return (
    <View className={cn(`items-center`)} style={{ width: SCREEN_WIDTH }}>
      <View className="flex-row">
        {DAYS.map((d) => {
          return (
            <View key={d} style={{ width: SCREEN_WIDTH / 7, alignItems: 'center', paddingVertical: 6 }}>
              <Text className="text-[#777]">{d}</Text>
            </View>
          );
        })}
      </View>
      <View>
        {dates.map((w, _w) => {
          return (
            <View key={`${date}-${_w + 1}week`} className={cn(`flex-row`)}>
              {w.map((d) => {
                const thisDate = dayjs(date).clone().set('date', d.date).format('YYYYMMDD');
                const isSelected = formatCurrentDate === thisDate && d.type === 'this';

                return (
                  <Day
                    key={`${date}-${_w + 1}week_${d.date}`}
                    item={d}
                    onPress={onPressDayItem}
                    isSelected={isSelected}
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

export default React.memo(CalendarItem);
