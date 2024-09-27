import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import dayjs from 'dayjs';

import CalendarList from '@/components/Calendar/CalendarList';
import CalendarTodo from '@/components/Calendar/CalendarTodo';
import Layout from '@/components/Layout/Layout.tsx';
import { CalendarType } from '@/constants';

const CalendarView = () => {
  const PAST_SCROLL_RANGE = 50;
  const FUTURE_SCROLL_RANGE = 50;
  const insets = useSafeAreaInsets();
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const initialDate = React.useRef(dayjs(currentDate));
  const [calendarType, setCalendarType] = React.useState<CalendarType>('month');
  const [items, setItems] = React.useState<string[]>([]);

  const initItems = (date?: dayjs.Dayjs) => {
    const lists = [];
    for (let i = 0; i <= PAST_SCROLL_RANGE + FUTURE_SCROLL_RANGE; i++) {
      const rangeDate = (date ?? initialDate.current).clone().add(i - PAST_SCROLL_RANGE, calendarType);
      lists.push(rangeDate.format('YYYY-MM-DD'));
    }
    setItems(lists);
  };

  React.useEffect(() => {
    initItems();
  }, [calendarType]);

  React.useEffect(() => {
    if (items.length > 0) {
      let currentItem = dayjs(currentDate).clone().format('YYYYMM');
      let firstItem = dayjs(items[0]).clone().format('YYYYMM');
      let lastItem = dayjs(items[items.length - 1])
        .clone()
        .format('YYYYMM');
      if (calendarType === 'week') {
        currentItem = dayjs(currentDate).clone().startOf('week').format('YYYYMMDD');
        firstItem = dayjs(items[0]).clone().startOf('week').format('YYYYMMDD');
        lastItem = dayjs(items[items.length - 1])
          .clone()
          .startOf('week')
          .format('YYYYMMDD');
      }
      if (currentItem <= firstItem) {
        setItems([]);
        initialDate.current = dayjs(firstItem).clone();
        initItems(initialDate.current);
      }
      if (currentItem >= lastItem) {
        setItems([]);
        initialDate.current = dayjs(lastItem).clone();
        initItems(initialDate.current);
      }
    }
  }, [items, calendarType, currentDate]);

  return (
    <View className="flex-1 bg-white">
      <Layout>
        <View style={{ paddingTop: insets.top }}>
          <CalendarList
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            initialDate={initialDate}
            calendarType={calendarType}
            setCalendarType={setCalendarType}
            items={items}
            PAST_SCROLL_RANGE={PAST_SCROLL_RANGE}
          />
        </View>
      </Layout>
      <CalendarTodo />
    </View>
  );
};

export default CalendarView;
