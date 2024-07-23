import React from 'react';
import { Text, View } from 'react-native';

const MatrixLayout = () => {
  return (
    <View className="flex-1">
      <View className="grid grid-flow-col grid-rows-2">
        <Text>hi</Text>
        <Text>hi</Text>
      </View>
    </View>
  );
};

export default MatrixLayout;
