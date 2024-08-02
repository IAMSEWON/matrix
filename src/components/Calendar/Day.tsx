import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';

import { IDayItem } from '@/constants';

const SCREEN_WIDTH = Dimensions.get('screen').width - 16;

interface IProps {
  item: IDayItem;
  date: string;
  onPress: (item: IDayItem) => void;
  currentDate: Date;
}
const Day = ({ item, date, onPress, currentDate }: IProps) => {
  const formatCurrentDate = dayjs(currentDate).format('YYYYMMDD');
  const thisDate = dayjs(date).clone().set('date', item.date);
  const thisDay = dayjs(`${item.yearMonth}${thisDate.format('DD')}`)
    .clone()
    .format('YYYYMMDD');
  const today = dayjs().format('YYYYMMDD');
  const isToday = today === thisDay;
  const isSelected = formatCurrentDate === thisDate.format('YYYYMMDD') && item.type === 'this';

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
    <TouchableOpacity
      onPress={() => onPress(item)}
      className="items-center justify-center rounded-[4px]"
      style={{
        width: SCREEN_WIDTH / 7,
        height: ((SCREEN_WIDTH / 7) * 3) / 5,
        backgroundColor: dateBgColor,
      }}
    >
      <Text style={{ color: dateTextColor }}>{item.date}</Text>
    </TouchableOpacity>
  );
};
export default React.memo(Day, (prevProps, nextProps) => {
  const prevFormatCurrentDate = dayjs(prevProps.currentDate).format('YYYYMMDD');
  const nextFormatCurrentDate = dayjs(nextProps.currentDate).format('YYYYMMDD');
  const thisDate = dayjs(prevProps.date).clone().set('date', prevProps.item.date);
  const prevIsSelected = prevFormatCurrentDate === thisDate.format('YYYYMMDD') && prevProps.item.type === 'this';
  const nextIsSelected = nextFormatCurrentDate === thisDate.format('YYYYMMDD') && nextProps.item.type === 'this';

  return prevIsSelected === nextIsSelected && prevProps.date !== dayjs(nextProps.currentDate).format('YYYY-M');
});
