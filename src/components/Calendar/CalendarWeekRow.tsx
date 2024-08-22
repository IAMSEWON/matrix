import React from 'react';
import { Dimensions, Text, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width - 16;

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const CalendarWeekRow = () => {
  return (
    <>
      {DAYS.map((d) => {
        return (
          <View
            key={d}
            style={{
              width: SCREEN_WIDTH / 7,
              alignItems: 'center',
              paddingVertical: 6,
              height: ((SCREEN_WIDTH / 7) * 3) / 5,
            }}
          >
            <Text className="text-[#777]">{d}</Text>
          </View>
        );
      })}
    </>
  );
};

export default React.memo(CalendarWeekRow);
