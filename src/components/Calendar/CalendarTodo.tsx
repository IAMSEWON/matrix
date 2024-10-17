import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { Plus } from 'lucide-react-native';

import useMatrixStore from '@/stores/matrix';
import { TodoType } from '@/types/matrix';
import { getDayText } from '@/utils/date';

import TodoItem, { ICalendarTotoItem } from './TodoItem';

interface ICalendarTodoProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarTodo = (props: ICalendarTodoProps) => {
  const { matrixs } = useMatrixStore();
  const { currentDate } = props;

  const [items, setItems] = React.useState<ICalendarTotoItem[]>([]);

  const initDates = () => {
    const dateCount = dayjs(currentDate).daysInMonth();
    const item: {
      [key: string]: ({
        categoryId: number;
        matrixKey: string;
      } & TodoType)[];
    } = {};
    for (let i = 1; i <= dateCount; i++) {
      const date = dayjs(currentDate).set('date', i).format('YYYY-MM-DD');
      item[date] = [];
    }
    const matrixsFlat = matrixs.flat(Infinity);
    matrixsFlat.forEach((m) => {
      const matrix = m.matrixs;
      Object.keys(matrix).forEach((k) => {
        if (matrix[k].contents.length > 0) {
          matrix[k].contents.forEach((c: TodoType) => {
            const date = dayjs(c.endDate).format('YYYY-MM-DD');
            item[date] = [
              ...item[date],
              {
                categoryId: m.id,
                matrixKey: k,
                ...c,
              },
            ];
          });
        }
      });
    });
    const formatItem: ICalendarTotoItem[] = [];
    Object.entries(item).forEach((value) => {
      formatItem.push({ date: dayjs(value[0]).toDate(), contents: value[1] });
    });
    setItems(formatItem);
  };

  React.useEffect(() => {
    initDates();
  }, []);

  // const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   console.log('onMomentumScrollEnd', e.nativeEvent);
  // };
  // const onViewableItemsChanged = (info: {
  //   viewableItems: ViewToken<ICalendarTotoItem>[];
  //   changed: ViewToken<ICalendarTotoItem>[];
  // }) => {
  //   console.log('onViewableItemsChanged', info.viewableItems[0]);
  // };

  const onStartReached = () => {
    // console.log('onStartReached');
  };
  const onEndReached = () => {
    // console.log('onEndReached');
  };

  const RenderItem = React.useCallback(
    ({ item }: { item: ICalendarTotoItem }) => {
      const isToday = dayjs().format('YYYYMMDD') === dayjs(item.date).format('YYYYMMDD');
      return (
        <View
          className="border-b-[1px] border-b-gray-300 px-[20px] py-[10px]"
          style={{ gap: 10 }}
          // onLayout={(e) => {
          //   console.log('eee', index, e.nativeEvent.layout.height);
          //   const { height } = e.nativeEvent.layout;
          //   setItemHeights((prev) => {
          //     return [...prev, height];
          //   });
          // }}
        >
          <View className="h-[15px] flex-row items-center" style={{ gap: 5 }}>
            <Text className="text-[13px] font-semibold" style={{ color: isToday ? '#007AFF' : '#000' }}>
              {getDayText(dayjs(item.date).day())}요일
            </Text>
            <Text className="text-[13px] font-medium" style={{ color: isToday ? '#007AFF' : '#999' }}>
              {dayjs(item.date).format('YYYY. M. D')}
            </Text>
          </View>
          <TodoItem {...item} />
          <View>
            <Pressable className="h-[50px] flex-row items-center justify-center rounded-[10px] bg-[#D9D9D9]">
              <Plus size={16} color="#555" />
              <Text className="ml-[5px] text-[#555]">할일 작성</Text>
            </Pressable>
          </View>
        </View>
      );
    },
    [items],
  );

  const initialScrollIndex = React.useMemo(() => {
    const index = items.findIndex((i) => dayjs(i.date).format('YYYYMMDD') === dayjs().format('YYYYMMDD'));
    return index;
  }, [items]);

  const getItemLayout = React.useCallback(
    (data: ArrayLike<ICalendarTotoItem> | null | undefined, index: number) => {
      const defaultHeight = 96;
      const itemHeight =
        defaultHeight +
        (items?.[index].contents.length ?? 0) * 48 +
        Math.max(0, items?.[index].contents.length ?? 0) * 10;
      let itemOffset = 0;
      for (let i = 0; i < index; i++) {
        const contentHeight = (items?.[i].contents.length ?? 0) * 48;
        const contentGap = Math.max(0, items?.[i].contents.length ?? 0) * 10;
        itemOffset += defaultHeight + contentHeight + contentGap;
      }
      return {
        length: itemHeight,
        offset: itemOffset,
        index,
      };
    },
    [items],
  );

  const scrollRef = React.useRef<FlatList>(null);

  return (
    <View className="flex-1 border-t-[1px] border-gray-200">
      {items.length > 0 && (
        <FlatList
          ref={scrollRef}
          data={items}
          renderItem={RenderItem}
          initialScrollIndex={initialScrollIndex > 0 ? initialScrollIndex : undefined}
          getItemLayout={getItemLayout}
          keyExtractor={(item) => item.date.toISOString()}
          // onMomentumScrollEnd={onMomentumScrollEnd}
          // onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 100,
          }}
          onStartReached={onStartReached}
          onStartReachedThreshold={0.7}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.7}
        />
      )}
    </View>
  );
};

export default CalendarTodo;
