import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import CheckBox from '@/components/CheckBox.tsx';
import { TodoType } from '@/types/matrix.ts';
import { cn } from '@/utils/tailwind.ts';

type MartixType = {
  onPress: () => void;
  contents?: TodoType[];
};

type MatrixLayoutProps = {
  doit: MartixType; // 긴급하고 중요한
  schedule: MartixType; // 긴급하지않고 중요한
  delegate: MartixType; // 긴급하고 중요하지 않은
  eliminate: MartixType; // 긴급하지않고 중요하지않고
};

const MatrixItem = ({ todo, color }: { todo: TodoType; color: string }) => {
  return (
    <View className="flex-row items-center" style={{ gap: 8 }}>
      <CheckBox onPress={() => {}} backgroundColor={color} checked={todo.isChecked} size="small" />
      <Text
        className="mr-6 text-sm"
        style={{
          textDecorationLine: todo.isChecked ? 'line-through' : 'none',
          color,
        }}
      >
        {todo.content}
      </Text>
    </View>
  );
};

const MatrixLayout = (props: MatrixLayoutProps) => {
  const { doit, schedule, delegate, eliminate } = props;

  const { colorScheme } = useColorScheme();

  const textStyle = 'text-base font-bold text-black dark:text-white';

  const backgroundColor = colorScheme === 'dark' ? '#666666' : '#f1f3f5';
  const color = colorScheme === 'dark' ? '#f1f3f5' : '#333333';

  const defaultMatrixStyle = 'mx-1 flex-1 rounded-lg p-2';

  return (
    <View className="flex-1">
      <View className="mb-1 flex-row justify-between">
        <View className="flex-[0.1]" />
        <Text className={cn('flex-1 text-center', textStyle)}>긴급한</Text>
        <Text className={cn('flex-1 text-center', textStyle)}>긴급하지 않은</Text>
      </View>
      <View className="mb-2 flex-1 flex-row justify-between">
        <Text className={cn('flex-[0.1] rotate-0 self-center', textStyle)}>중요한</Text>
        <Pressable
          onPress={() => doit.onPress()}
          className={cn(defaultMatrixStyle)}
          style={{
            backgroundColor,
            gap: 5,
          }}
        >
          {doit.contents?.map((item) => <MatrixItem key={item.todoId} todo={item} color={color} />)}
        </Pressable>
        <Pressable
          onPress={() => schedule.onPress()}
          className={cn(defaultMatrixStyle)}
          style={{
            backgroundColor,
          }}
        >
          {schedule.contents?.map((item) => <MatrixItem key={item.todoId} todo={item} color={color} />)}
        </Pressable>
      </View>
      <View className="flex-1 flex-row justify-between">
        <Text className={cn('flex-[0.1] rotate-0 self-center', textStyle)}>중요하지 않은</Text>
        <Pressable
          onPress={() => delegate.onPress()}
          className={cn(defaultMatrixStyle)}
          style={{
            backgroundColor,
          }}
        >
          {delegate.contents?.map((item) => <MatrixItem key={item.todoId} todo={item} color={color} />)}
        </Pressable>
        <Pressable
          onPress={() => eliminate.onPress()}
          className={cn(defaultMatrixStyle)}
          style={{
            backgroundColor,
          }}
        >
          {eliminate.contents?.map((item) => <MatrixItem key={item.todoId} todo={item} color={color} />)}
        </Pressable>
      </View>
    </View>
  );
};

export default MatrixLayout;
