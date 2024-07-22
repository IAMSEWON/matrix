import React from 'react';
import { View } from 'react-native';
import dayjs from 'dayjs';

interface IProps {
  date: string;
}

// 현재 년도 기준 앞뒤로 5년 까지만 생성
// 월/주별 토글 기능
// 토글 시 앞뒤 컴포넌트 생성
// 스와이프 시 월/주 변경, 해당 첫번째 일자 포커싱
const CalendarItem = ({ date }: IProps) => {
  console.log('CalendarItem props', date);
  // 주별 아이템 리스트
  const [prevDates, setPrevDates] = React.useState<string[]>([]);
  // 월 아이템 리스트
  const [thisDates, setThisDates] = React.useState<string[]>([]);
  const [nextDates, setNextDates] = React.useState<string[]>([]);

  React.useEffect(() => {
    // 전달 말일 구하기
    const prevMonthLastDate = dayjs(date).subtract(1, 'month').daysInMonth();
    // 이번달 1일 요일 구하기
    const thisMonthFirstDay = dayjs(date).day();
    // 이번달 말일, 요일 구하기
    console.log('prevMonthLastDate', prevMonthLastDate);
    console.log('thisMonthFirstDay', thisMonthFirstDay);
    // 한 달에 6주 생성
    for (let w = 0; w < 6; w++) {
      const weekArr = [];
      if (w === 0 && thisMonthFirstDay > 0) {
      }
    }
  }, []);

  return <View />;
};

export default CalendarItem;
