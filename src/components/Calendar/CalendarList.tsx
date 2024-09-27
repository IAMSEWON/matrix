import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import dayjs from 'dayjs';
import findIndex from 'lodash/findIndex';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react-native';

import { CalendarType } from '@/constants';

import ListItem from './ListItem';

interface IProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  initialDate: React.MutableRefObject<dayjs.Dayjs>;
  calendarType: CalendarType;
  setCalendarType: React.Dispatch<React.SetStateAction<CalendarType>>;
  items: string[];
  PAST_SCROLL_RANGE: number;
}

const CALENDAR_WIDTH = Dimensions.get('screen').width - 16;
const CalendarList = ({
  currentDate,
  setCurrentDate,
  initialDate,
  calendarType,
  setCalendarType,
  items,
  PAST_SCROLL_RANGE,
}: IProps) => {
  const visibleDate = React.useRef(dayjs(currentDate));
  const [refreshing] = React.useState<boolean>(false);
  const [isScrolling, setIsScrolling] = React.useState<boolean>(false);

  const onPressDay = React.useCallback(
    (date: Date) => {
      if (calendarType === 'month') {
        setIsScrolling(true);
      }
      handleChangeDate(date);
      scrollToCurrent(date);
    },
    [calendarType, currentDate, isScrolling],
  );
  const changePrevMonth = React.useCallback(() => {
    let prev = new Date();
    if (calendarType === 'month') {
      prev = dayjs(currentDate).clone().date(1).subtract(1, 'month').toDate();
    }
    if (calendarType === 'week') {
      prev = dayjs(dayjs(currentDate).clone().subtract(1, 'week').startOf('week')).clone().toDate();
    }
    handleChangeDate(prev);
    scrollToCurrent(prev);
  }, [calendarType, currentDate]);
  const changeNextMonth = React.useCallback(() => {
    let next = new Date();
    if (calendarType === 'month') {
      next = dayjs(currentDate).clone().date(1).add(1, 'month').toDate();
    }
    if (calendarType === 'week') {
      next = dayjs(dayjs(currentDate).clone().add(1, 'week').startOf('week')).clone().toDate();
    }
    handleChangeDate(next);
    scrollToCurrent(next);
  }, [calendarType, currentDate]);

  const handleChangeDate = React.useCallback(
    (date: Date) => {
      setCurrentDate(date);
    },
    [currentDate],
  );

  const scrollToCurrent = React.useCallback(
    (date: Date = currentDate) => {
      const currentD = calendarType === 'month' ? 1 : dayjs(initialDate.current).startOf('week').date();
      const scrollD = calendarType === 'month' ? 1 : dayjs(date).startOf('week').date();
      const currentScroll = dayjs(initialDate.current).clone().date(currentD);
      const scrollTo =
        calendarType === 'month' ? dayjs(date).clone().date(scrollD) : dayjs(date).clone().startOf('week');
      const diffMonth = Math.round(scrollTo.diff(currentScroll, 'month', true));
      const diffWeek = Math.round(scrollTo.diff(currentScroll, 'week', true));
      const scrollAmount = CALENDAR_WIDTH * (PAST_SCROLL_RANGE + (calendarType === 'month' ? diffMonth : diffWeek));
      if (scrollAmount !== 0) {
        visibleDate.current = scrollTo;
        calendarListRef?.current?.scrollToOffset({
          offset: scrollAmount,
          animated: date !== currentDate,
        });
      }
    },
    [calendarType, currentDate, initialDate, isScrolling],
  );

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrolling) {
      setIsScrolling(false);
    } else {
      const contentOffsetx = e.nativeEvent.contentOffset.x;
      const index = Math.floor(contentOffsetx / CALENDAR_WIDTH);
      const newDate = dayjs(items[index]).startOf(calendarType).toDate();
      setCurrentDate(newDate);
    }
  };

  const renderItem = React.useCallback(
    (props: { item: string }) => {
      return (
        <ListItem
          date={props.item}
          currentDate={currentDate}
          onPressDay={onPressDay}
          calendarType={calendarType}
          setCalendarType={setCalendarType}
        />
      );
    },
    [calendarType, currentDate],
  );

  const initialDateIndex = React.useMemo(() => {
    if (items.length === 0) return 0;
    return findIndex(items, function (item) {
      return item.toString() === dayjs(initialDate.current).clone().format('YYYY-MM-DD');
    });
  }, [items, initialDate.current]);

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

  const SCREEN_WIDTH = Dimensions.get('screen').width - 16;
  const dayItemHeight = ((SCREEN_WIDTH / 7) * 3) / 5;
  React.useEffect(() => {
    scrollToCurrent();
    if (calendarType === 'month') {
      calendarViewHeight.value = withTiming(dayItemHeight * 7, { duration: 100 });
    } else {
      calendarViewHeight.value = withTiming(dayItemHeight * 2, { duration: 100 });
    }
  }, [calendarType, items]);
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
        initialScrollIndex={Math.max(initialDateIndex, 0)}
        scrollEventThrottle={16}
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={getItemLayout}
        maxToRenderPerBatch={3}
        windowSize={11}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={
          !refreshing ? (
            <View className="flex-1 justify-center">
              <ActivityIndicator />
            </View>
          ) : null
        }
        ListHeaderComponent={
          refreshing ? (
            <View className="flex-1 justify-center">
              <ActivityIndicator />
            </View>
          ) : null
        }
        style={[{ marginTop: 5 }, calendarViewAnimatedStyle]}
      />
    </View>
  );
};

export default CalendarList;
