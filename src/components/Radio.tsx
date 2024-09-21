import React from 'react';
import { Pressable, Text, View } from 'react-native';

type RadioProps = {
  value: boolean;
  darkMode?: boolean;
  onChange?: () => void;
  text?: string;
};

const Radio = ({ value, text, darkMode, onChange }: RadioProps) => {
  return (
    <Pressable onPress={onChange} className="flex-row" style={{ gap: 8 }}>
      <View
        className="h-5 w-5 items-center justify-center rounded-full"
        style={{
          borderWidth: 1,
          borderColor: darkMode ? '#f5f5f5' : '#1E1F23',
          borderRadius: 8,
        }}
      >
        {value && (
          <View
            className="h-3 w-3 rounded-full"
            style={{
              backgroundColor: darkMode ? '#f5f5f5' : '#1E1F23',
              borderWidth: 1,
              borderColor: darkMode ? '#f5f5f5' : '#1E1F23',
              borderRadius: 8,
            }}
          />
        )}
      </View>
      <Text className="self-center text-black">{text}</Text>
    </Pressable>
  );
};

export default Radio;
