import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';

import { IDayItem } from '@/constants';

const SCREEN_WIDTH = Dimensions.get('screen').width - 16;

interface IProps {
  item: IDayItem;
  onPress: (item: IDayItem) => void;
  isSelected: boolean;
  isToday: boolean;
}
const Day = ({ item, onPress, isSelected, isToday }: IProps) => {
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
export default React.memo(Day);
