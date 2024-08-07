import { Control, Controller, FieldError, FieldValues, RegisterOptions } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import Label from '@/components/Form/Label.tsx';
import { cn } from '@/utils/tailwind.ts';

type InputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>; // control 타입에 모든 타입 허용
  name: string;
  label: string;
  placeholder: string;
  errors?: FieldError;
  errorMessage?: string;
  rules?: RegisterOptions<FieldValues>;
} & TextInputProps; // This line combines InputProps with TextInputProps

// 예제 코드

/*
<Input
  label="카테고리 이름"
  name="firstName"
  placeholder="First name"
  control={control}
  errors={errors.firstName}
  errorMessage="테스트 첫번째 에러"
  returnKeyType="next"
  rules={{
    required: 'First name is required',
    minLength: 2,
  }}
  onSubmitEditing={() => setFocus('lastName')}
/>
*/

const Input = ({
  control,
  returnKeyType,
  name,
  label,
  placeholder,
  errors,
  errorMessage,
  rules,
  ...props
}: InputProps) => {
  return (
    <View className="flex-col" style={{ gap: 8 }}>
      <Label label={label} />
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextInput
            placeholder={placeholder}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            ref={ref}
            returnKeyType={returnKeyType} // 키보드 완료 버튼에 대한 속성 타입
            className={cn('rounded-lg bg-white px-2 py-3', props.className)}
            {...props}
          />
        )}
        name={name}
      />
      <View className="h-4">{errors && <Text className="text-red-500">{errorMessage}</Text>}</View>
    </View>
  );
};

export default Input;
