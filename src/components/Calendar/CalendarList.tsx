import React from 'react';
import { FlatList } from 'react-native';
import dayjs from 'dayjs';

import { CalendarType } from '@/constants';

import CalendarItem from './CalendarItem';

type YearMonthItem = {
  year: number;
  month: number;
};
interface IProps {
  date: Date;
  calendarType: CalendarType;
}

// 현재 년도 기준 앞뒤로 5년 까지만 생성
// 월/주별 토글 기능
// 토글 시 앞뒤 컴포넌트 생성
// 스와이프 시 월/주 변경, 해당 첫번째 일자 포커싱
const CalendarList = ({ date, calendarType }: IProps) => {
  console.log('CalendarList props', date, calendarType);
  const [dateList, setDateList] = React.useState<string[]>([]);

  const initDateList = (currentDate: Date) => {
    const startYear = dayjs(currentDate).subtract(5, 'year').year();
    const endYear = dayjs(currentDate).add(5, 'year').year();
    const month = dayjs(currentDate).month();
    const makeYearMonthArr = [];
    for (let y = startYear; y < endYear; y++) {
      if (y === startYear) {
        for (let m = 1; m < month + 1; m++) {
          makeYearMonthArr.push(`${y}-${m}`);
        }
      } else if (y === endYear) {
        for (let m = month + 1; m < 13; m++) {
          makeYearMonthArr.push(`${y}-${m}`);
        }
      } else {
        for (let m = 1; m < 13; m++) {
          makeYearMonthArr.push(`${y}-${m}`);
        }
      }
    }
    // setDateList(makeYearMonthArr);
    setDateList(['2024-6']);
  };

  const renderItem = ({ item }: { item: string }) => <CalendarItem date={item} />;

  React.useEffect(() => {
    initDateList(date);
  }, []);

  return <FlatList data={dateList} renderItem={renderItem} />;
};

export default CalendarList;
