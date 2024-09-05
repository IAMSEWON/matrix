import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { TodoType } from '@/types/matrix.ts';
import { cn } from '@/utils/tailwind.ts';

type MartixType = {
  backgroundColor?: string;
  onPress: () => void;
  contents?: TodoType[];
};

type MatrixLayoutProps = {
  doit: MartixType; // 긴급하고 중요한
  schedule: MartixType; // 긴급하지않고 중요한
  delegate: MartixType; // 긴급하고 중요하지 않은
  eliminate: MartixType; // 긴급하지않고 중요하지않고
};

const MatrixLayout = (props: MatrixLayoutProps) => {
  const { doit, schedule, delegate, eliminate } = props;

  const textStyle = 'text-base font-bold text-black dark:text-white';

  const defaultMatrixBackgroundColor = '#d9d9d9';

  const defaultMatrixStyle = 'mx-1 flex-1 rounded-lg';

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
            backgroundColor: doit.backgroundColor || defaultMatrixBackgroundColor,
          }}
        >
          {doit.contents?.map((content) => {
            return (
              <View key={content.id}>
                <Text className="text-black">{content.content}</Text>
              </View>
            );
          })}
        </Pressable>
        <Pressable
          onPress={() => schedule.onPress()}
          className={cn(defaultMatrixStyle)}
          style={{
            backgroundColor: schedule.backgroundColor || defaultMatrixBackgroundColor,
          }}
        >
          {schedule.contents?.map((content) => {
            return (
              <View key={content.id}>
                <Text className="text-black">{content.content}</Text>
              </View>
            );
          })}
        </Pressable>
      </View>
      <View className="flex-1 flex-row justify-between">
        <Text className={cn('flex-[0.1] rotate-0 self-center', textStyle)}>중요하지 않은</Text>
        <Pressable
          onPress={() => delegate.onPress()}
          className={cn(defaultMatrixStyle)}
          style={{
            backgroundColor: delegate.backgroundColor || defaultMatrixBackgroundColor,
          }}
        >
          {delegate.contents?.map((content) => {
            return (
              <View key={content.id}>
                <Text className="text-black">{content.content}</Text>
              </View>
            );
          })}
        </Pressable>
        <Pressable
          onPress={() => eliminate.onPress()}
          className={cn(defaultMatrixStyle)}
          style={{
            backgroundColor: eliminate.backgroundColor || defaultMatrixBackgroundColor,
          }}
        >
          {eliminate.contents?.map((content) => {
            return (
              <View key={content.id}>
                <Text className="text-black">{content.content}</Text>
              </View>
            );
          })}
        </Pressable>
      </View>
    </View>
  );
};

export default MatrixLayout;
