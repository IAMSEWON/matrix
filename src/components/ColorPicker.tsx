import React, { useRef } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';

import { Button } from '@/components/Button.tsx';
import BottomSheetModalComponent from '@/components/Sheet/BottomSheetModal.tsx';
import { cn } from '@/utils/tailwind.ts';

const colorsData: Record<string, string[]> = {
  Rose: [
    '#fff1f2',
    '#ffe4e6',
    '#fecdd3',
    '#fda4af',
    '#fb7185',
    '#f43f5e',
    '#e11d48',
    '#be123c',
    '#9f1239',
    '#881337',
    '#4c0519',
  ],
  Pink: [
    '#fdf2f8',
    '#fce7f3',
    '#fbcfe8',
    '#f9a8d4',
    '#f472b6',
    '#ec4899',
    '#db2777',
    '#be185d',
    '#9d174d',
    '#831843',
    '#500724',
  ],
  Fuchsia: [
    '#fdf4ff',
    '#fae8ff',
    '#f5d0fe',
    '#f0abfc',
    '#e879f9',
    '#d946ef',
    '#c026d3',
    '#a21caf',
    '#86198f',
    '#701a75',
    '#4a044e',
  ],
  Purple: [
    '#faf5ff',
    '#f3e8ff',
    '#e9d5ff',
    '#d8b4fe',
    '#c084fc',
    '#a855f7',
    '#9333ea',
    '#7e22ce',
    '#6b21a8',
    '#581c87',
    '#3b0764',
  ],
  Violet: [
    '#f5f3ff',
    '#ede9fe',
    '#ddd6fe',
    '#c4b5fd',
    '#a78bfa',
    '#8b5cf6',
    '#7c3aed',
    '#6d28d9',
    '#5b21b6',
    '#4c1d95',
    '#2e1065',
  ],
  Indigo: [
    '#eef2ff',
    '#e0e7ff',
    '#c7d2fe',
    '#a5b4fc',
    '#818cf8',
    '#6366f1',
    '#4f46e5',
    '#4338ca',
    '#3730a3',
    '#312e81',
    '#1e1b4b',
  ],
  Blue: [
    '#eff6ff',
    '#dbeafe',
    '#bfdbfe',
    '#93c5fd',
    '#60a5fa',
    '#3b82f6',
    '#2563eb',
    '#1d4ed8',
    '#1e40af',
    '#1e3a8a',
    '#172554',
  ],
  Sky: [
    '#f0f9ff',
    '#e0f2fe',
    '#bae6fd',
    '#7dd3fc',
    '#38bdf8',
    '#0ea5e9',
    '#0284c7',
    '#0369a1',
    '#075985',
    '#0c4a6e',
    '#082f49',
  ],
  Cyan: [
    '#ecfeff',
    '#cffafe',
    '#a5f3fc',
    '#67e8f9',
    '#22d3ee',
    '#06b6d4',
    '#0891b2',
    '#0e7490',
    '#155e75',
    '#164e63',
    '#083344',
  ],
  Teal: [
    '#f0fdfa',
    '#ccfbf1',
    '#99f6e4',
    '#5eead4',
    '#2dd4bf',
    '#14b8a6',
    '#0d9488',
    '#0f766e',
    '#115e59',
    '#134e4a',
    '#042f2e',
  ],
  Emerald: [
    '#ecfdf5',
    '#d1fae5',
    '#a7f3d0',
    '#6ee7b7',
    '#34d399',
    '#10b981',
    '#059669',
    '#047857',
    '#065f46',
    '#064e3b',
    '#022c22',
  ],
  Green: [
    '#f0fdf4',
    '#dcfce7',
    '#bbf7d0',
    '#86efac',
    '#4ade80',
    '#22c55e',
    '#16a34a',
    '#15803d',
    '#166534',
    '#14532d',
    '#052e16',
  ],
  Lime: [
    '#f7fee7',
    '#ecfccb',
    '#d9f99d',
    '#bef264',
    '#a3e635',
    '#84cc16',
    '#65a30d',
    '#4d7c0f',
    '#3f6212',
    '#365314',
    '#1a2e05',
  ],
  Yellow: [
    '#fefce8',
    '#fef9c3',
    '#fef08a',
    '#fde047',
    '#facc15',
    '#eab308',
    '#ca8a04',
    '#a16207',
    '#854d0e',
    '#713f12',
    '#422006',
  ],
  Amber: [
    '#fffbeb',
    '#fef3c7',
    '#fde68a',
    '#fcd34d',
    '#fbbf24',
    '#f59e0b',
    '#d97706',
    '#b45309',
    '#92400e',
    '#78350f',
    '#451a03',
  ],
  Orange: [
    '#fff7ed',
    '#ffedd5',
    '#fed7aa',
    '#fdba74',
    '#fb923c',
    '#f97316',
    '#ea580c',
    '#c2410c',
    '#9a3412',
    '#7c2d12',
    '#431407',
  ],
  Red: [
    '#fef2f2',
    '#fee2e2',
    '#fecaca',
    '#fca5a5',
    '#f87171',
    '#ef4444',
    '#dc2626',
    '#b91c1c',
    '#991b1b',
    '#7f1d1d',
    '#450a0a',
  ],
  Stone: [
    '#fafaf9',
    '#f5f5f4',
    '#e7e5e4',
    '#d6d3d1',
    '#a8a29e',
    '#78716c',
    '#57534e',
    '#44403c',
    '#292524',
    '#1c1917',
    '#0c0a09',
  ],
  Neutral: [
    '#fafafa',
    '#f5f5f5',
    '#e5e5e5',
    '#d4d4d4',
    '#a3a3a3',
    '#737373',
    '#525252',
    '#404040',
    '#262626',
    '#171717',
    '#0a0a0a',
  ],
  Zinc: [
    '#fafafa',
    '#f4f4f5',
    '#e4e4e7',
    '#d4d4d8',
    '#a1a1aa',
    '#71717a',
    '#52525b',
    '#3f3f46',
    '#27272a',
    '#18181b',
    '#09090b',
  ],
  Gray: [
    '#f9fafb',
    '#f3f4f6',
    '#e5e7eb',
    '#d1d5db',
    '#9ca3af',
    '#6b7280',
    '#4b5563',
    '#374151',
    '#1f2937',
    '#111827',
    '#030712',
  ],
  Slate: [
    '#f8fafc',
    '#f1f5f9',
    '#e2e8f0',
    '#cbd5e1',
    '#94a3b8',
    '#64748b',
    '#475569',
    '#334155',
    '#1e293b',
    '#0f172a',
    '#020617',
  ],
};

const ColorBox = ({
  color,
  index,
  onChangeColor,
}: {
  color: string;
  index: number;
  onChangeColor: (color: string) => void;
}) => {
  const firstColorRound = index === 0 ? 'rounded-l-lg' : '';
  const lastColorRound = index === 10 ? 'rounded-r-lg' : '';

  return (
    <Pressable
      onPress={() => onChangeColor(color)}
      className={cn('my-2 h-10 w-14', firstColorRound, lastColorRound)}
      style={{ backgroundColor: color }}
    />
  );
};

const ColorSection = ({ colors, onChangeColor }: { colors: string[]; onChangeColor: (color: string) => void }) => (
  <View>
    <FlashList
      data={colors}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => <ColorBox color={item} index={index} onChangeColor={onChangeColor} />}
      keyExtractor={(item) => item}
      horizontal
      estimatedItemSize={10}
    />
  </View>
);

type ColorPickerProps = {
  onPickColor: (color: string) => void;
  color?: string;
  buttonComponent: React.ReactNode;
};

const ColorPicker = ({ color = '#fff', onPickColor, buttonComponent }: ColorPickerProps) => {
  const colorSheetRef = useRef<BottomSheetModal>(null);

  // 애니메이 색상 상태
  const backgroundColor = useSharedValue(color);

  // 색상 선택 시 0.5초 동안 버튼 배경 애니메이션 효과
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value, { duration: 500 }),
    };
  });

  // 색상 선택 함수
  const onChangeColorHandler = (selectColor: string) => {
    backgroundColor.value = selectColor;
  };

  // 바텀시트 닫히면 색상 초기화 함수
  const onCancelHandler = () => {
    backgroundColor.value = '#ffffff';
  };

  const onPickColorHandler = (pickColor: string) => {
    onPickColor(pickColor);
    colorSheetRef.current?.close();
  };

  const buttonWithOnPress = React.cloneElement(buttonComponent as React.ReactElement, {
    onPress: () => colorSheetRef.current?.present(),
  });

  return (
    <>
      {buttonWithOnPress}
      <BottomSheetModalComponent
        ref={colorSheetRef}
        title="색상 선택"
        snapPoints="75%"
        onCancel={onCancelHandler}
        footer={
          <Button variant="outline" size="flex" onPress={() => onPickColorHandler(backgroundColor.value)}>
            <Animated.View
              className="h-full w-full flex-1 items-center justify-center rounded-lg"
              style={animatedStyle}
            >
              <View className="h-[80%] w-[98%] items-center justify-center rounded-md bg-white">
                <Text className="font-semibold">선택</Text>
              </View>
            </Animated.View>
          </Button>
        }
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {Object.keys(colorsData).map((key) => (
            <ColorSection key={key} colors={colorsData[key]} onChangeColor={onChangeColorHandler} />
          ))}
        </ScrollView>
      </BottomSheetModalComponent>
    </>
  );
};

export default ColorPicker;