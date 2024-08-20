import React, { useEffect } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';

import { getContrastYIQ } from '@/utils/color.ts';

interface CheckBoxProps {
  onPress: () => void;
  checked: boolean;
  backgroundColor?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ backgroundColor = '#f1f3f5', onPress, checked }) => {
  const scale = useSharedValue(1);
  const animatedBackgroundColor = useSharedValue(backgroundColor);

  const handlePress = () => {
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: animatedBackgroundColor.value,
  }));

  useEffect(() => {
    animatedBackgroundColor.value = withTiming(checked ? backgroundColor : '#f1f3f5', { duration: 300 });
    scale.value = withSpring(0.95, { damping: 2 }, () => {
      scale.value = withSpring(1);
    });
  }, [checked]);

  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <Animated.View style={[styles.checkbox, animatedStyle]}>
        {checked && <Check size={16} color={getContrastYIQ(backgroundColor)} />}
      </Animated.View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
export default CheckBox;
