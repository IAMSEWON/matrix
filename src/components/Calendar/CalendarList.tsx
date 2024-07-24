import React from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';

// import { CalendarType } from '@/constants';
import CalendarItem from './CalendarItem';

interface IProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  // calendarType: CalendarType;
  // setCalendarType: React.Dispatch<React.SetStateAction<CalendarType>>;
}

const SCREEN_WIDTH = Dimensions.get('screen').width - 16;
// 현재 년도 기준 앞뒤로 5년 까지만 생성
// 월/주별 토글 기능
// 토글 시 앞뒤 컴포넌트 생성
// 스와이프 시 월/주 변경, 해당 첫번째 일자 포커싱
const CalendarList = ({
  currentDate,
  setCurrentDate,
  // calendarType,
  // setCalendarType
}: IProps) => {
  const [dateList, setDateList] = React.useState<string[]>([]);

  const initDateList = (date: Date) => {
    const DATE = dayjs(date);
    const startYear = DATE.clone().subtract(5, 'year').year();
    const endYear = DATE.clone().add(5, 'year').year();
    const makeYearMonthArr = [];
    for (let y = startYear; y < endYear; y++) {
      for (let m = 1; m < 13; m++) {
        makeYearMonthArr.push(`${y}-${m}`);
      }
    }
    setDateList(makeYearMonthArr);
    // setDateList(['2024-7']);
  };

  const handleChangeDate = (date: Date) => {
    setCurrentDate(date);
  };
  const changePrevMonth = () => {
    const prev = dayjs(currentDate).subtract(1, 'month').set('date', 1).toDate();
    handleChangeDate(prev);
  };
  const changeNextMonth = () => {
    const next = dayjs(currentDate).add(1, 'month').set('date', 1).toDate();
    handleChangeDate(next);
  };

  // const handleItemChange = ({ viewableItems }: { viewableItems: Array<ViewToken<string>> }) => {
  //   const item = viewableItems[viewableItems.length - 1];
  //   const date = dayjs(item.item).toDate();
  //   handleChangeDate(date);
  // };

  const renderItem = ({ item }: { item: string }) => {
    return <CalendarItem date={item} currentDate={currentDate} onPressDay={handleChangeDate} />;
  };

  React.useEffect(() => {
    initDateList(currentDate);
  }, [currentDate]);

  const calendarListRef = React.useRef<FlatList>(null);

  return (
    <View className="w-full">
      <View className="flex-row items-center">
        <View>
          <Text>{dayjs(currentDate).format('YYYY년 M월')}</Text>
        </View>
        <TouchableOpacity onPress={changePrevMonth}>
          <Text>이전달</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={changeNextMonth}>
          <Text>다음달</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={calendarListRef}
        horizontal
        pagingEnabled
        data={dateList}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item;
        }}
        snapToInterval={SCREEN_WIDTH}
        scrollEventThrottle={16}
        decelerationRate="fast"
        // onViewableItemsChanged={handleItemChange}
      />
    </View>
  );
};

export default CalendarList;
