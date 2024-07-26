import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';

import { IDayItem } from '@/constants';

const SCREEN_WIDTH = Dimensions.get('screen').width - 16;

interface IProps {
  item: IDayItem;
  onPress: (item: IDayItem) => void;
  isSelected: boolean;
}
const Day = ({ item, onPress, isSelected }: IProps) => {
  let dateTextColor = 'black';
  if (item.type !== 'this') {
    dateTextColor = '#999';
  } else if (isSelected) {
    dateTextColor = '#fff';
  } else {
    dateTextColor = '#000';
  }
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      className="items-center justify-center rounded-[4px] border-2"
      style={{
        width: SCREEN_WIDTH / 7,
        height: ((SCREEN_WIDTH / 7) * 3) / 5,
        backgroundColor: isSelected ? 'black' : 'white',
      }}
    >
      <Text style={{ color: dateTextColor }}>{item.date}</Text>
    </TouchableOpacity>
  );
};
export default React.memo(Day);
