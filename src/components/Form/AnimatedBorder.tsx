import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';

type AnimatedBorderProps = {
  children: React.ReactNode;
  value: string;
  error?: boolean;
};

const AnimatedBorder = ({ children, value, error }: AnimatedBorderProps) => {
  const borderColor = useSharedValue('transparent');

  const { colorScheme } = useColorScheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(borderColor.value, { duration: 500 }),
    };
  });
  if (error) {
    borderColor.value = 'red';
  } else if (value) {
    borderColor.value = '#007bff';
  } else {
    borderColor.value = 'transparent';
  }

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          borderRadius: 8,
          width: '100%',
          height: 48,
          alignSelf: 'center',
          overflow: 'hidden',
          borderWidth: 2,
          backgroundColor: colorScheme === 'light' ? '#f1f3f5' : '#272A2E',
        },
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedBorder;
