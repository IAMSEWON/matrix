import React, { useEffect } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';

interface CheckBoxProps {
  onPress: () => void;
  checked: boolean;
  backgroundColor?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ backgroundColor = '#f1f3f5', onPress, checked }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withSpring(0.98, { damping: 2 }, () => {
      scale.value = withSpring(1);
    });
  }, [checked]);

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Animated.View
        style={[
          styles.checkbox,
          animatedStyle,
          {
            borderColor: backgroundColor,
          },
        ]}
      >
        {checked && <Check size={16} color={backgroundColor} />}
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
    borderWidth: 1,
  },
});
export default CheckBox;
