import React from 'react';

import CalendarList from '@/components/Calendar/CalendarList';
import Layout from '@/components/Layout.tsx';
import { CalendarType } from '@/constants';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const [calendarType, setCalendarType] = React.useState<CalendarType>('month');

  return (
    <Layout>
      <CalendarList
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        calendarType={calendarType}
        setCalendarType={setCalendarType}
      />
    </Layout>
  );
};

export default CalendarView;
