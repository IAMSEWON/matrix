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
  const dateList = React.useMemo(() => {
    const DATE = dayjs(currentDate);
    const startYear = DATE.clone().subtract(5, 'year').year();
    const endYear = DATE.clone().add(5, 'year').year();
    const makeYearMonthArr = [];
    for (let y = startYear; y < endYear; y++) {
      for (let m = 1; m < 13; m++) {
        makeYearMonthArr.push(`${y}-${m}`);
      }
    }
    // for (let m = 1; m < 13; m++) {
    //   makeYearMonthArr.push(`${2024}-${m}`);
    // }
    return makeYearMonthArr;
  }, []);
  // }, [currentDate]);

  const handleChangeDate = (date: Date) => {
    setCurrentDate(date);
  };
  const changePrevMonth = () => {
    const prev = dayjs(currentDate).clone().subtract(1, 'month').set('date', 1).toDate();
    handleChangeDate(prev);
  };
  const changeNextMonth = () => {
    const next = dayjs(currentDate).clone().add(1, 'month').set('date', 1).toDate();
    handleChangeDate(next);
  };

  // const handleItemChange = ({ viewableItems }: { viewableItems: Array<ViewToken<string>> }) => {
  // console.log('viewableItems', viewableItems);
  // const item = viewableItems[viewableItems.length - 1];
  // const date = dayjs(item.item).toDate();
  // handleChangeDate(date);
  // };

  const calendarListRef = React.useRef<FlatList>(null);
  const scrollToDateIndex = React.useCallback(() => {
    if (calendarListRef.current && dateList.length > 0) {
      const index = dateList.findIndex((d) => dayjs(d).format('YYYYMM') === dayjs(currentDate).format('YYYYMM'));
      calendarListRef.current.scrollToIndex({ index });
    }
  }, [calendarListRef, dateList, currentDate]);

  const getItemLayout = (data: ArrayLike<string> | null | undefined, index: number) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  });

  const renderItem = ({ item }: { item: string }) => {
    return <CalendarItem date={item} currentDate={currentDate} onPressDay={handleChangeDate} />;
  };

  const keyExtractor = React.useCallback((item: string) => item, []);

  React.useEffect(() => {
    scrollToDateIndex();
  }, [currentDate]);

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
      {dateList.length > 0 && (
        <FlatList
          ref={calendarListRef}
          horizontal
          pagingEnabled
          data={dateList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          snapToInterval={SCREEN_WIDTH}
          scrollEventThrottle={16}
          decelerationRate="fast"
          getItemLayout={getItemLayout}
          onLayout={scrollToDateIndex}
          // windowSize={11}
          // onViewableItemsChanged={handleItemChange}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 90,
            waitForInteraction: true,
          }}
        />
      )}
    </View>
  );
};

export default CalendarList;
