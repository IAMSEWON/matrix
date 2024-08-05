import React from 'react';

import CalendarList from '@/components/Calendar/CalendarList';
import Layout from '@/components/Layout.tsx';
import { CalendarType } from '@/constants';

// 이전달,다음달 버튼으로 월변경되는 경우, 스와이프 월변경과 겹쳐서 스크롤 제대로 되지 않는 경우 체크
// 1,6,12월 변경 시 해당월 기준으로 1년 날짜목록 재생성 (최대월 개수 12개월)
// 월/주별 토글 기능
// 토글 시 앞뒤 컴포넌트 생성
// 스와이프 시 월/주 변경, 해당 첫번째 일자 포커싱
const CalendarView = () => {
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  // console.log('currentDate', currentDate);
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
