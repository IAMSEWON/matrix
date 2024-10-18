import React, { useEffect } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Check } from 'lucide-react-native';

interface CheckBoxProps {
  onPress: () => void;
  checked: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
}

const checkBoxSize = {
  small: 14,
  medium: 20,
  large: 24,
};

const CheckBox: React.FC<CheckBoxProps> = ({ backgroundColor = '#f1f3f5', onPress, checked, size = 'medium' }) => {
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
          {
            width: checkBoxSize[size] + 3,
            height: checkBoxSize[size] + 3,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: backgroundColor,
          },
          animatedStyle,
        ]}
      >
        {checked && <Check size={checkBoxSize[size]} color={backgroundColor} />}
      </Animated.View>
    </TouchableNativeFeedback>
  );
};

export default CheckBox;
