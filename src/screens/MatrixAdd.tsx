import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import DetePickerButton from '@/components/Form/DatePickerButton.tsx';
import Dropdown from '@/components/Form/DropDown.tsx';
import Form from '@/components/Form/Form.tsx';
import Input from '@/components/Form/Input.tsx';
import RadioGroup from '@/components/Form/RadioGroup.tsx';
import Layout from '@/components/Layout/Layout.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';

type MatrixAddNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'MatrixAdd'>;

const MatrixAdd = () => {
  const { matrix, matrixs } = useMatrixStore();
  //
  const navigation = useNavigation<MatrixAddNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: matrix?.id.toString(),
      todo: '',
      importance: 'doit',
      endDate: '',
      alram: 'N',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitHandler = (data: any) => {
    console.log(data);
  };

  return (
    <Layout>
      <Form
        onScroll={() => Keyboard.dismiss()}
        onClose={() => navigation.goBack()}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Dropdown
          label="카테고리 선택"
          placeholder="카테고리를 선택해주세요"
          name="category"
          control={control}
          errors={errors.category}
          options={matrixs.map((item) => {
            return {
              label: item.category,
              value: item.id.toString(),
            };
          })}
        />
        <Input
          label="할 일 작성"
          name="todo"
          placeholder="할 일을 작성해주세요"
          control={control}
          errors={errors.todo}
          errorMessage="테스트 첫번째 에러"
          rules={{
            required: 'First name is required',
            minLength: 2,
          }}
        />
        <RadioGroup
          type="MATRIX"
          label="중요도"
          name="importance"
          control={control}
          errors={errors.importance}
          options={['doit', 'schedule', 'delegate', 'eliminate'].map((item) => {
            return {
              label: item,
              value: item,
            };
          })}
        />
        <DetePickerButton
          label="마감 날짜/시간 선택"
          name="end"
          control={control}
          errors={errors.endDate}
          placeholder="마감 날짜/시간을 선택해주세요"
        />
        <RadioGroup
          label="푸시 알림"
          name="alram"
          control={control}
          errors={errors.alram}
          options={[
            { label: '알림 받기', value: 'Y' },
            { label: '알림 받지 않기', value: 'N' },
          ].map((item) => {
            return {
              label: item.label,
              value: item.value,
            };
          })}
        />
      </Form>
    </Layout>
  );
};

export default MatrixAdd;
