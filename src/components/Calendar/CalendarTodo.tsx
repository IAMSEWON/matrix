import React from 'react';
import { FlatList, Text, View } from 'react-native';

// import useMatrixStore from '@/stores/matrix';
import TodoItem from './TodoItem';

const CalendarTodo = () => {
  //   const { matrixs } = useMatrixStore();

  const RenderItem = React.useCallback(() => {
    return (
      <View className="gap-3 px-[20px] py-[10px]">
        <View className="flex-row items-center" style={{ gap: 5 }}>
          <Text className="text-[13px] font-bold">화요일</Text>
          <Text className="text-[13px] font-medium text-[#999]">2025. 2. 25</Text>
        </View>
        <View>
          <TodoItem />
        </View>
      </View>
    );
  }, []);

  const SeparateComponent = () => {
    return <View className="h-[1px] w-full bg-gray-200" />;
  };

  return (
    <View className="flex-1 border-t-[1px] border-gray-200">
      <FlatList data={[1]} renderItem={RenderItem} ItemSeparatorComponent={SeparateComponent} />
    </View>
  );
};

export default CalendarTodo;
