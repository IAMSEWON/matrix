import React from 'react';
import { FieldError } from 'react-hook-form';
import { Text, View } from 'react-native';

const ErrorMessage = ({ errors, message }: { errors: FieldError | undefined; message?: string }) => {
  return <View className="h-4">{errors && <Text className="font-semibold text-red-500">{message}</Text>}</View>;
};

export default ErrorMessage;
