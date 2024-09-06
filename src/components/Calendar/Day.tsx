import React from 'react';
import { Dimensions, Text, TouchableWithoutFeedback, View } from 'react-native';
import dayjs from 'dayjs';

import { CalendarType, IDayItem } from '@/constants';

const SCREEN_WIDTH = Dimensions.get('screen').width - 16;

interface IProps {
  item: IDayItem;
  onPress: (item: IDayItem) => void;
  currentDate: Date;
  calendarType: CalendarType;
}
const Day = ({ item, onPress, currentDate, calendarType }: IProps) => {
  const formatCurrentDate = dayjs(currentDate).format('YYYYMMDD');
  const thisDay = dayjs(`${item.yearMonth}${item.date}`).clone().format('YYYYMMDD');
  const today = dayjs().format('YYYYMMDD');
  const isToday = today === thisDay;
  let isSelected = formatCurrentDate === thisDay && item.type === 'this';
  if (calendarType === 'week') {
    isSelected = formatCurrentDate === thisDay;
  }

  let dateBgColor = 'white';
  let dateTextColor = 'black';
  if (item.type !== 'this') {
    dateTextColor = '#999';
  }
  if (isToday) {
    dateBgColor = '#C5ECFF';
  }
  if (isSelected) {
    dateBgColor = 'black';
    dateTextColor = '#fff';
  }
  return (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <View
        className="items-center justify-center rounded-[4px]"
        style={{
          width: SCREEN_WIDTH / 7,
          height: ((SCREEN_WIDTH / 7) * 3) / 5,
          backgroundColor: dateBgColor,
        }}
      >
        <Text style={{ color: dateTextColor }}>{item.date}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default React.memo(Day, (prevProps, nextProps) => {
  if (prevProps.calendarType !== nextProps.calendarType) return false;
  if (prevProps.item.type !== nextProps.item.type) return false;
  const prevFormatCurrentDate = dayjs(prevProps.currentDate).format('YYYYMMDD'); // 이전에 선택된 날짜
  const nextFormatCurrentDate = dayjs(nextProps.currentDate).format('YYYYMMDD'); // 현재 선택된 날짜
  const thisDay = dayjs(`${nextProps.item.yearMonth}${nextProps.item.date}`).clone().format('YYYYMMDD');
  // 이번달로 렌더링된 날짜 컴포넌트 && 이전 선택 여부
  const prevIsSelected = prevProps.item.type === 'this' && prevFormatCurrentDate === thisDay;
  // 이번달로 렌더링된 날짜 컴포넌트 && 현재 선택 여부
  const nextIsSelected = nextProps.item.type === 'this' && nextFormatCurrentDate === thisDay;

  // 이전,현재 선택 여부가 동일하면(이전,현재 둘다 선택되지 않은경우) 메모이징
  return prevIsSelected === nextIsSelected;
});
