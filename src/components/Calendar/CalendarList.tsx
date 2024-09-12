import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, Text, TouchableOpacity, View, ViewToken } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import dayjs from 'dayjs';
import findIndex from 'lodash/findIndex';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react-native';

import { CalendarType } from '@/constants';
import { sameDate, sameMonth } from '@/utils/date';

import CalendarItem from './CalendarItem';

interface IProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  calendarType: CalendarType;
  setCalendarType: React.Dispatch<React.SetStateAction<CalendarType>>;
}

const CALENDAR_WIDTH = Dimensions.get('screen').width - 16;
// const PAST_SCROLL_RANGE = 50;
const PAST_SCROLL_RANGE = 10;
// const FUTURE_SCROLL_RANGE = 50;
const FUTURE_SCROLL_RANGE = 10;
let onViewableItemsChangedTimeOut: NodeJS.Timeout | null = null;
let visibleDateTypeChangedTimeOut: NodeJS.Timeout | null = null;
const CalendarList = ({ currentDate, setCurrentDate, calendarType, setCalendarType }: IProps) => {
  // const [initialDate, setInitialDate] = React.useState(dayjs(currentDate));
  const initialDate = React.useRef(dayjs(currentDate));
  const visibleDate = React.useRef(dayjs(currentDate));
  const visibleDateType = React.useRef('month');
  const [refreshing] = React.useState<boolean>(false);
  const [ITEM, setItem] = React.useState<string[]>([]);

  const onPressDay = React.useCallback(
    (date: Date) => {
      handleChangeDate(date);
      scrollToCurrent(date);
    },
    [calendarType, currentDate],
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

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken<string>> }) => {
      if (calendarType !== visibleDateType.current) {
        if (visibleDateTypeChangedTimeOut) clearTimeout(visibleDateTypeChangedTimeOut);
        visibleDateTypeChangedTimeOut = setTimeout(() => {
          visibleDateType.current = calendarType;
        }, 500);
        return;
      }

      const newVisibleDate = dayjs(viewableItems[0]?.item);
      const sameCheck =
        calendarType === 'month'
          ? sameMonth(visibleDate?.current.toDate(), newVisibleDate.toDate())
          : sameDate(visibleDate?.current.toDate(), newVisibleDate.toDate());
      if (!sameCheck) {
        if (onViewableItemsChangedTimeOut) clearTimeout(onViewableItemsChangedTimeOut);
        onViewableItemsChangedTimeOut = setTimeout(() => {
          let changeDate = new Date();

          if (calendarType === 'month') {
            changeDate = dayjs(newVisibleDate).clone().date(1).toDate();
          } else {
            const firstDay = dayjs(newVisibleDate).startOf('week');
            if (firstDay.month() !== newVisibleDate.month()) {
              changeDate = firstDay.toDate();
            } else {
              changeDate = dayjs(newVisibleDate)
                .clone()
                .date(dayjs(newVisibleDate).clone().startOf('week').date())
                .toDate();
            }
          }
          visibleDate.current = newVisibleDate;
          handleChangeDate(changeDate);
        }, 200);
      }
    },
    [calendarType],
  );

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
    [calendarType, currentDate, initialDate],
  );

  // React.useEffect(() => {
  //   // console.log('initialDate', initialDate);
  //   const currentD = calendarType === 'month' ? 1 : dayjs(initialDate).startOf('week').date();
  //   const scrollD = calendarType === 'month' ? 1 : dayjs(currentDate).startOf('week').date();
  //   const currentScroll = dayjs(initialDate).clone().date(currentD);
  //   const scrollTo =
  //     calendarType === 'month' ? dayjs(currentDate).clone().date(scrollD) : dayjs(currentDate).clone().startOf('week');
  //   const diffMonth = Math.round(scrollTo.diff(currentScroll, 'month', true));
  //   const diffWeek = Math.round(scrollTo.diff(currentScroll, 'week', true));
  //   const targetDiff = calendarType === 'month' ? diffMonth : diffWeek;
  //   console.log('targetDiff', targetDiff);
  //   if (targetDiff <= PAST_SCROLL_RANGE || targetDiff >= FUTURE_SCROLL_RANGE) {
  //     setInitialDate(dayjs(currentDate));
  //   }
  // }, [currentDate]);

  const initItems = () => {
    const lists = [];
    for (let i = 0; i <= PAST_SCROLL_RANGE + FUTURE_SCROLL_RANGE; i++) {
      const rangeDate = initialDate.current.clone().add(i - PAST_SCROLL_RANGE, calendarType);
      lists.push(rangeDate.format('YYYY-MM-DD'));
    }
    setItem(lists);
  };

  const loadMoreItem = (direction: 'prev' | 'next') => {
    // console.log('loadMoreItem()', direction);
    let lists = [...ITEM];
    const arr = [];
    // console.log('lists 11', lists);
    if (direction === 'prev') {
      lists = lists.slice(0, PAST_SCROLL_RANGE - 1);
      initialDate.current = dayjs(lists[0]);
      for (let i = 0; i <= PAST_SCROLL_RANGE; i++) {
        const rangeDate = dayjs(lists[0])
          .clone()
          .add(i - 1 - PAST_SCROLL_RANGE, calendarType);
        arr.push(rangeDate.format('YYYY-MM-DD'));
      }
      lists = [...arr, ...lists];
    } else {
      lists = lists.slice(-(FUTURE_SCROLL_RANGE + 1));
      initialDate.current = dayjs(lists[lists.length - 1]);
      for (let i = 0; i <= FUTURE_SCROLL_RANGE; i++) {
        const rangeDate = dayjs(lists[lists.length - 1])
          .clone()
          .add(i + 1, calendarType)
          .format('YYYY-MM-DD');
        arr.push(rangeDate);
      }
      lists = [...lists, ...arr];
    }
    // console.log('lists 22', lists);
    setItem(lists);
  };

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
    [calendarType, currentDate],
  );

  React.useEffect(() => {
    initItems();
  }, [calendarType]);

  // const items: string[] = React.useMemo(() => {
  //   const lists = [];
  //   for (let i = 0; i <= PAST_SCROLL_RANGE + FUTURE_SCROLL_RANGE; i++) {
  //     const rangeDate = initialDate.current.clone().add(i - PAST_SCROLL_RANGE, calendarType);
  //     lists.push(rangeDate.format('YYYY-MM-DD'));
  //   }
  //   return lists;
  //   // }, [PAST_SCROLL_RANGE, FUTURE_SCROLL_RANGE, calendarType, initialDate]);
  // }, [PAST_SCROLL_RANGE, FUTURE_SCROLL_RANGE, calendarType]);

  // React.useEffect(() => {
  //   console.log('React.useEffect items', items);
  //   console.log('React.useEffect currentDate', currentDate);
  //   // const scrollAmount = CALENDAR_WIDTH * PAST_SCROLL_RANGE + 1;
  //   const scrollAmount = CALENDAR_WIDTH * PAST_SCROLL_RANGE;
  //   calendarListRef?.current?.scrollToOffset({
  //     offset: scrollAmount,
  //     animated: false,
  //   });
  // }, [items]);

  const initialDateIndex = React.useMemo(() => {
    return findIndex(ITEM, function (item) {
      return item.toString() === dayjs(currentDate).clone().format('YYYY-MM-DD');
    });
  }, [ITEM, currentDate]);
  // console.log('initialDateIndex', initialDateIndex);

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
        data={ITEM}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={1}
        initialScrollIndex={Math.max(initialDateIndex, 0)}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 20,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        getItemLayout={getItemLayout}
        maxToRenderPerBatch={3}
        windowSize={11}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => {
          loadMoreItem('next');
        }}
        onEndReachedThreshold={0.5}
        onStartReached={() => {
          loadMoreItem('prev');
        }}
        onStartReachedThreshold={0.5}
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
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={() => {
        //       console.log('onRefresh 222');
        //       loadMoreItem();
        //     }}
        //     progressViewOffset={60}
        //   />
        // }
        style={[{ marginTop: 5 }, calendarViewAnimatedStyle]}
      />
    </View>
  );
};

export default CalendarList;
