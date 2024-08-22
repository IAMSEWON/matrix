import React from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View, ViewToken } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import dayjs from 'dayjs';
import findIndex from 'lodash/findIndex';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react-native';

import { CalendarType } from '@/constants';
import { sameMonth } from '@/utils/date';

import CalendarItem from './CalendarItem';

interface IProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  calendarType: CalendarType;
  setCalendarType: React.Dispatch<React.SetStateAction<CalendarType>>;
}

const CALENDAR_WIDTH = Dimensions.get('screen').width - 16;
const PAST_SCROLL_RANGE = 50;
const FUTURE_SCROLL_RANGE = 50;
let onViewableItemsChangedTimeOut: NodeJS.Timeout | null = null;
const CalendarList = ({ currentDate, setCurrentDate, calendarType, setCalendarType }: IProps) => {
  const initialDate = React.useRef(dayjs(currentDate));
  const visibleMonth = React.useRef(dayjs(currentDate));

  const onPressDay = React.useCallback(
    (date: Date) => {
      handleChangeDate(date);
      scrollToMonth(date);
    },
    [currentDate],
  );
  const changePrevMonth = React.useCallback(() => {
    const prev = dayjs(currentDate).clone().date(1).subtract(1, 'month').toDate();
    handleChangeDate(prev);
    scrollToMonth(prev);
  }, [currentDate]);
  const changeNextMonth = React.useCallback(() => {
    const next = dayjs(currentDate).clone().date(1).add(1, 'month').toDate();
    handleChangeDate(next);
    scrollToMonth(next);
  }, [currentDate]);

  const onViewableItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: Array<ViewToken<string>> }) => {
    const newVisibleMonth = dayjs(viewableItems[0]?.item);
    if (!sameMonth(visibleMonth?.current.toDate(), newVisibleMonth.toDate())) {
      if (onViewableItemsChangedTimeOut) clearTimeout(onViewableItemsChangedTimeOut);
      onViewableItemsChangedTimeOut = setTimeout(() => {
        visibleMonth.current = newVisibleMonth;
        const changeDate = dayjs(newVisibleMonth).clone().date(1).toDate();
        handleChangeDate(changeDate);
      }, 200);
    }
  }, []);

  const handleChangeDate = React.useCallback(
    (date: Date) => {
      setCurrentDate(date);
    },
    [currentDate],
  );
  const scrollToMonth = React.useCallback((date: Date) => {
    const currentScroll = dayjs(initialDate.current).clone().date(1);
    const scrollTo = dayjs(date).clone().date(1);
    const diffMonths = Math.round(scrollTo.diff(currentScroll, 'month', true));
    const scrollAmount = CALENDAR_WIDTH * (PAST_SCROLL_RANGE + diffMonths);
    if (scrollAmount !== 0) {
      visibleMonth.current = scrollTo;
      calendarListRef?.current?.scrollToOffset({ offset: scrollAmount, animated: true });
    }
  }, []);

  const renderItem = React.useCallback(
    (props: { item: string }) => {
      return (
        <CalendarItem
          date={props.item}
          currentDate={currentDate}
          onPressDay={onPressDay}
          calendarType={calendarType}
          setCalendarType={setCalendarType}
        />
      );
    },
    [currentDate, calendarType],
  );
  const items: string[] = React.useMemo(() => {
    const months = [];
    for (let i = 0; i <= PAST_SCROLL_RANGE + FUTURE_SCROLL_RANGE; i++) {
      const rangeDate = initialDate.current.clone().add(i - PAST_SCROLL_RANGE, 'month');
      months.push(rangeDate.format('YYYY-MM-DD'));
    }
    return months;
  }, [PAST_SCROLL_RANGE, FUTURE_SCROLL_RANGE]);

  const initialDateIndex = React.useMemo(() => {
    return findIndex(items, function (item) {
      return item.toString() === initialDate.current?.format('YYYY-MM-DD');
    });
  }, [items]);

  const calendarListRef = React.useRef<FlatList>(null);

  const getItemLayout = React.useCallback(
    (data: ArrayLike<string> | null | undefined, index: number) => ({
      length: CALENDAR_WIDTH,
      offset: CALENDAR_WIDTH * index,
      index,
    }),
    [],
  );

  const keyExtractor = React.useCallback((item: string) => item, []);

  const viewabilityConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 20,
  });
  const viewabilityConfigCallbackPairs = React.useRef([
    {
      viewabilityConfig: viewabilityConfig.current,
      onViewableItemsChanged,
    },
  ]);

  const SCREEN_WIDTH = Dimensions.get('screen').width - 16;
  const dayItemHeight = ((SCREEN_WIDTH / 7) * 3) / 5;
  React.useEffect(() => {
    if (calendarType === 'month') {
      calendarViewHeight.value = withTiming(dayItemHeight * 7, { duration: 100 });
    } else {
      calendarViewHeight.value = withTiming(dayItemHeight * 2, { duration: 100 });
    }
  }, [calendarType]);
  const calendarViewHeight = useSharedValue(dayItemHeight * 7);

  const calendarViewAnimatedStyle = useAnimatedStyle(() => ({
    height: calendarViewHeight.value,
  }));

  return (
    <View className="w-full">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-bold">{dayjs(currentDate).format('YYYY년 M월')}</Text>
        </View>
        <View className="flex-row gap-2">
          <TouchableOpacity onPress={changePrevMonth}>
            <SquareChevronLeft color="#000" size={30} style={{}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={changeNextMonth}>
            <SquareChevronRight color="#000" size={30} style={{}} />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.FlatList
        ref={calendarListRef}
        horizontal
        pagingEnabled
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={1}
        initialScrollIndex={initialDateIndex}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        getItemLayout={getItemLayout}
        maxToRenderPerBatch={3}
        windowSize={11}
        showsHorizontalScrollIndicator={false}
        style={[{ marginTop: 5 }, calendarViewAnimatedStyle]}
      />
    </View>
  );
};

export default CalendarList;
