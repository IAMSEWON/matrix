import * as React from 'react';
import { Dimensions, Pressable, Text } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Settings } from 'lucide-react-native';

import HeaderIcon from '@/components/Layout/HeaderIcon.tsx';
import { HomeStackParamList } from '@/types/navigation.ts';
import { cn } from '@/utils/tailwind.ts';

const PAGE_WIDTH = Dimensions.get('window').width;

type SwipeTextProps = {
  value: string;
  texts: string[];
  onScroll: (index: number) => void;
  onPress: () => void;
  darkMode?: boolean;
};

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const SwipeText = ({ value, texts, onScroll, onPress, darkMode }: SwipeTextProps) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
    height: PAGE_WIDTH / 2,
  } as const;

  const defaultIndex = Math.max(0, texts?.indexOf(value) ?? 0);

  return (
    <>
      <Carousel
        {...baseOptions}
        loop={false}
        ref={ref}
        style={{ width: '85%' }}
        autoPlay={false}
        data={texts}
        onSnapToItem={onScroll}
        defaultIndex={defaultIndex}
        renderItem={({ item }) => (
          <TapGestureHandler>
            <Pressable onPress={onPress} className="ml-8 mt-1.5 items-center justify-center">
              <Text
                className="text-xl font-semibold"
                style={[
                  {
                    color: darkMode ? '#ffffff' : '#000000',
                  },
                ]}
                numberOfLines={1}
              >
                {item}
              </Text>
            </Pressable>
          </TapGestureHandler>
        )}
      />
      <HeaderIcon
        headerClassName={cn('absolute w-20 top-2.5 -right-3 z-50')}
        icons={[
          {
            name: '설정',
            icon: <Settings size={23} color={darkMode ? 'white' : 'black'} />,
            onPress: () => navigation.navigate('Setting'),
          },
        ]}
      />
    </>
  );
};

export default SwipeText;
