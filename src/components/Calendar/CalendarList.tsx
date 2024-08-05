import React from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View, ViewToken } from 'react-native';
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
const CalendarList = ({
  currentDate,
  setCurrentDate,
  // calendarType,
  // setCalendarType
}: IProps) => {
  const DATE = dayjs(currentDate);

  // const [dateList, setDateList] = React.useState([]);

  // const initDateList = React.useCallback(() => {
  //     const makeYearMonthArr = [];
  //     const startYear = DATE.clone()
  //       .subtract(DATE.month() === 0 ? 1 : 0)
  //       .year();
  //     const endYear = DATE.clone()
  //       .add(DATE.month() === 11 ? 2 : 1, 'year')
  //       .year();
  //   if (DATE.month() === 0) {
  //       for (let y = startYear; y < endYear; y++) {
  //         for (let m = 1; m < 13; m++) {
  //           makeYearMonthArr.push(`${y}-${m}`);
  //         }
  //       }
  //   } else if (DATE.month() === 5) {
  //   } else if (DATE.month() === 11) {
  //   } else {
  //   }
  // }, [currentDate]);

  const dateList = React.useMemo(() => {
    const makeYearMonthArr = [];
    const startYear = DATE.clone()
      .subtract(DATE.month() === 0 ? 1 : 0)
      .year();
    const endYear = DATE.clone()
      .add(DATE.month() === 11 ? 2 : 1, 'year')
      .year();
    for (let y = startYear; y < endYear; y++) {
      for (let m = 1; m < 13; m++) {
        makeYearMonthArr.push(`${y}-${m}`);
      }
    }
    return makeYearMonthArr;
  }, [DATE]);

  const handleChangeDate = React.useCallback(
    (date: Date) => {
      setCurrentDate(date);
    },
    [currentDate],
  );
  const changePrevMonth = React.useCallback(() => {
    const prev = dayjs(currentDate).clone().subtract(1, 'month').set('date', 1).toDate();
    handleChangeDate(prev);
  }, [currentDate]);
  const changeNextMonth = React.useCallback(() => {
    const next = dayjs(currentDate).clone().add(1, 'month').set('date', 1).toDate();
    handleChangeDate(next);
  }, [currentDate]);

  const handleItemChange = React.useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken<string>> }) => {
      const item = viewableItems[viewableItems.length - 1]?.item;
      const currentYearMonth = dayjs(currentDate).format('YYYY-M');
      if (item && item !== currentYearMonth) {
        const changeDate = dayjs(`${item}-1`).toDate();
        if (dayjs(changeDate).isValid()) {
          handleChangeDate(changeDate);
        }
      }
    },
    [currentDate],
  );

  const calendarListRef = React.useRef<FlatList>(null);
  const scrollToDateIndex = React.useCallback(() => {
    if (calendarListRef.current && dateList.length > 0) {
      const index = dateList.findIndex((d) => dayjs(d).format('YYYYMM') === dayjs(currentDate).format('YYYYMM'));
      if (index >= 0) {
        calendarListRef.current.scrollToIndex({ index });
      }
    }
  }, [calendarListRef, dateList, currentDate]);

  const getItemLayout = React.useCallback(
    (data: ArrayLike<string> | null | undefined, index: number) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    [],
  );

  const renderItem = ({ item }: { item: string }) => {
    return <CalendarItem date={item} currentDate={currentDate} onPressDay={handleChangeDate} />;
  };

  const keyExtractor = React.useCallback((item: string) => item, []);

  React.useEffect(() => {
    scrollToDateIndex();
    // initDateList();
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
          disableIntervalMomentum
          scrollEventThrottle={16}
          decelerationRate="fast"
          getItemLayout={getItemLayout}
          onLayout={scrollToDateIndex}
          onViewableItemsChanged={handleItemChange}
          viewabilityConfig={{
            minimumViewTime: 200,
            viewAreaCoveragePercentThreshold: 95,
            // itemVisiblePercentThreshold: 75,
            // waitForInteraction: true,
          }}
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default CalendarList;
