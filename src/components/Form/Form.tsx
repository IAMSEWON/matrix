import { useForm } from 'react-hook-form';
import { Button, ScrollView } from 'react-native';

import Input from '@/components/Form/Input.tsx';

const Form = () => {
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => console.log(data);

  return (
    <ScrollView style={{ gap: 12 }}>
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
      <Input
        label="카테고리 이름"
        name="lastName"
        placeholder="Second name"
        control={control}
        errors={errors.lastName}
        errorMessage="테스트 첫번째 에러"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};

export default Form;
