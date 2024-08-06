import React from 'react';
import { Image, View } from 'react-native';

const Logo = () => {
  return (
    <View style={{ flex: 1 }}>
      <Image height={12} width={12} source={require('@/assets/images/matrix-logo.png')} />
    </View>
  );
};

export default Logo;
