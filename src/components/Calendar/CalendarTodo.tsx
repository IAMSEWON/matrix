import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import dayjs from 'dayjs';

import useMatrixStore from '@/stores/matrix';
import { useMatrixAdd } from '@/stores/matrixAdd';
import { TodoType } from '@/types/matrix';
import { getDayText } from '@/utils/date';

import TodoItem from './TodoItem';

interface ICalendarTodoProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarTodo = (props: ICalendarTodoProps) => {
  const { matrixs } = useMatrixStore();
  const { currentDate } = props;
  const { setIsVisibleMatrixAdd } = useMatrixAdd();

  const [currentTodo, setCurrentTodo] = React.useState<({ categoryId: number } & TodoType)[]>([]);

  React.useEffect(() => {
    findCurrentTodo();
  }, [matrixs, currentDate]);

  const findCurrentTodo = () => {
    const todos: ({ categoryId: number } & TodoType)[] = [];
    const currentDateString = dayjs(currentDate).clone().format('YYYY-MM-DD');
    matrixs.reverse().forEach((m) => {
      m.matrixs.reverse().forEach((item) => {
        if (
          dayjs(item.startDate).format('YYYY-MM-DD') <= currentDateString &&
          dayjs(item.endDate).format('YYYY-MM-DD') >= currentDateString
        ) {
          todos.push({ categoryId: m.categoryId, ...item });
        }
      });
    });
    setCurrentTodo(todos);
  };

  return (
    <View className="flex-1 border-t-[1px] border-gray-200">
      <View className="flex-1 px-[20px]">
        <View className="flex-row items-center justify-between">
          <View className="h-[15px] flex-row items-center" style={{ gap: 5 }}>
            <Text className="text-[13px] font-semibold">{getDayText(dayjs(currentDate).day())}요일</Text>
            <Text className="text-[13px] font-medium">{dayjs(currentDate).format('YYYY. M. D')}</Text>
          </View>
          <View>
            <Pressable
              onPress={() => {
                setIsVisibleMatrixAdd(true);
              }}
              className="flex-row items-center justify-center px-[10px] py-[8px]"
            >
              <Text className="ml-[5px] text-[#555] underline">+ 할일 작성</Text>
            </Pressable>
          </View>
        </View>
        <View className="flex-1" style={{ gap: 5 }}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 5 }}>
            {currentTodo.map((ct) => {
              return <TodoItem key={`${ct.categoryId}_${ct.todoId}`} {...ct} />;
            })}
            {currentTodo.length === 0 && (
              <View>
                <Text>등록된 할일이 없습니다.</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default CalendarTodo;
