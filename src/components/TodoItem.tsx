import React from 'react';
import { ColorValue, Pressable, Text, View } from 'react-native';
import dayjs from 'dayjs';
import { Timer } from 'lucide-react-native';

import CheckBox from '@/components/CheckBox.tsx';
import { alramTimeOptions } from '@/data/time.ts';
import { TodoType } from '@/types/matrix.ts';

type TodoItemProps = {
  item: TodoType;
  categoryId: number;
  onCheckTodoHandler: (categoryId: number, todoId: number) => void;
  color: ColorValue | undefined;
  backgroundColor: ColorValue | undefined;
};

const MatrixItem = ({
  type,
  backgroundColor,
}: {
  type: 'doit' | 'schedule' | 'delegate' | 'eliminate';
  backgroundColor: ColorValue | undefined;
}) => {
  return (
    <View
      className="items-center overflow-hidden rounded px-1 py-1 text-xs"
      style={{
        borderRadius: 4,
        backgroundColor,
        gap: 2,
      }}
    >
      <View className="items-center justify-center" style={{ gap: 3 }}>
        <View className="flex-row gap-[3px]">
          <View
            className="h-1.5 w-1.5 rounded-sm bg-[#007bff]"
            style={{
              backgroundColor: type === 'doit' ? '#007bff' : '#a4c0d1',
            }}
          />
          <View
            className="h-1.5 w-1.5 rounded-sm bg-gray-300"
            style={{
              backgroundColor: type === 'schedule' ? '#007bff' : '#a4c0d1',
            }}
          />
        </View>
        <View className="flex-row gap-[3px]">
          <View
            className="h-1.5 w-1.5 rounded-sm bg-gray-300"
            style={{
              backgroundColor: type === 'delegate' ? '#007bff' : '#a4c0d1',
            }}
          />
          <View
            className="h-1.5 w-1.5 rounded-sm bg-gray-300"
            style={{
              backgroundColor: type === 'eliminate' ? '#007bff' : '#a4c0d1',
            }}
          />
        </View>
      </View>
    </View>
  );
};

const TodoItem = ({ item, categoryId, onCheckTodoHandler, color, backgroundColor }: TodoItemProps) => {
  return (
    <View className="flex-col justify-between p-2" style={{ gap: 6 }}>
      <View className="flex-row items-center" style={{ gap: 10 }}>
        <CheckBox
          onPress={() => onCheckTodoHandler(categoryId, item.todoId)}
          backgroundColor={color}
          checked={item.isChecked}
        />
        <Text
          className="mr-6 text-lg"
          style={{
            textDecorationLine: item.isChecked ? 'line-through' : 'none',
            color,
          }}
        >
          {item.content}
        </Text>
      </View>
      <Pressable onPress={() => {}} key={item.todoId} className="flex-row items-center" style={{ gap: 8 }}>
        <MatrixItem type={item.importance} backgroundColor={backgroundColor} />
        <Text
          className="items-center overflow-hidden rounded px-1 py-1 text-xs"
          style={{
            borderRadius: 4,
            backgroundColor,
            color,
          }}
        >
          {dayjs(item.endDate).format('MM월 DD일')}
        </Text>
        <Text
          className="items-center overflow-hidden rounded px-1 py-1 text-xs"
          style={{
            borderRadius: 4,
            backgroundColor,
            color,
          }}
        >
          {dayjs(item.endDate).format('A HH:mm')}
        </Text>
        {item.alramTime && (
          <View
            className="flex-row overflow-hidden rounded px-1 py-1 text-xs"
            style={{
              borderRadius: 4,
              backgroundColor,
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Timer size={12} color={color} className="" />
            <Text
              className="text-xs"
              style={{
                color,
              }}
            >
              {alramTimeOptions.find((option) => option.value === item.alramTime)?.label}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default TodoItem;
