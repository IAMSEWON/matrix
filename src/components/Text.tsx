import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

import useMatrixStore from '@/stores/matrix.ts';
import { getContrastYIQ } from '@/utils/color.ts';

type TextComponentProps = TextProps;

const Text = (props: TextComponentProps) => {
  const { className, style } = props;

  const { matrix } = useMatrixStore();

  return (
    <RNText
      {...props}
      className={className}
      style={[
        {
          color: getContrastYIQ(matrix?.categoryBackgroundColor),
        },
        style,
      ]}
    />
  );
};

export default Text;
