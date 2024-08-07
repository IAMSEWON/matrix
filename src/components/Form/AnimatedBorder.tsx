import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type AnimatedBorderProps = {
  children: React.ReactNode;
  value: string;
  error?: boolean;
};

const AnimatedBorder = ({ children, value, error }: AnimatedBorderProps) => {
  const borderColor = useSharedValue('transparent');

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
          backgroundColor: '#f1f3f5',
        },
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedBorder;
