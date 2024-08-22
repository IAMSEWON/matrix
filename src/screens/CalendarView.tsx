import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CalendarList from '@/components/Calendar/CalendarList';
import Layout from '@/components/Layout/Layout.tsx';
import { CalendarType } from '@/constants';

// 월/주별 토글 기능
// 현재일자 기준 앞,뒤 50개월 추가된 상태에서 첫번째 또는 마지막 월로 변경 시 날짜 기간 추가
const CalendarView = () => {
  const insets = useSafeAreaInsets();
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  // console.log('currentDate', currentDate);
  const [calendarType, setCalendarType] = React.useState<CalendarType>('month');
  // console.log('calendarType', calendarType);

  return (
    <Layout>
      <View style={{ paddingTop: insets.top }}>
        <CalendarList
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          calendarType={calendarType}
          setCalendarType={setCalendarType}
        />
      </View>
      <View>
        <Text>ejiowjoefwi</Text>
      </View>
    </Layout>
  );
};

export default CalendarView;
