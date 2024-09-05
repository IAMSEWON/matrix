import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface FadeInFadeOutProps {
  duration?: number;
  className?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  fadeIn: boolean;
}

const FadeInFadeOut: React.FC<FadeInFadeOutProps> = ({ duration = 500, children, style, className, fadeIn }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('🔥🔥/ :16 - fadeIn = ', fadeIn);

    Animated.timing(fadeAnim, {
      toValue: fadeIn ? 1 : 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeIn, duration, fadeAnim]);

  return (
    <Animated.View style={[{ flex: 1, zIndex: 1, opacity: fadeAnim }, style]} className={className}>
      {children}
    </Animated.View>
  );
};

export default FadeInFadeOut;
