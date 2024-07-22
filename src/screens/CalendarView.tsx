import React from 'react';

import CalendarList from '@/components/Calendar/CalendarList';
import Layout from '@/components/Layout.tsx';
import { CalendarType } from '@/constants';

const CalendarView = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [calendarType, setCalendarType] = React.useState<CalendarType>('month');

  return (
    <Layout>
      <CalendarList date={date} calendarType={calendarType} />
    </Layout>
  );
};

export default CalendarView;
