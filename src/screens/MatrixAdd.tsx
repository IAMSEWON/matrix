import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';

import DetePickerButton from '@/components/Form/DatePickerButton.tsx';
import Dropdown from '@/components/Form/DropDown.tsx';
import Form from '@/components/Form/Form.tsx';
import Input from '@/components/Form/Input.tsx';
import RadioGroup from '@/components/Form/RadioGroup.tsx';
import useMatrixStore from '@/stores/matrix.ts';
import { MatrixAddType } from '@/types/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';

type MatrixAddNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'MatrixAdd'>;

const MatrixAdd = () => {
  const { matrix, matrixs, addTodo } = useMatrixStore();
  //
  const navigation = useNavigation<MatrixAddNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MatrixAddType>({
    defaultValues: {
      categoryId: matrix?.id.toString(),
      content: '',
      importance: 'doit',
      endDate: '',
      alram: 'N',
    },
  });

  const onSubmitHandler = (data: MatrixAddType) => {
    const matrixId = parseInt(data.categoryId, 10);
    const matrixType = data.importance;
    const todo = {
      content: data.content,
      endDate: dayjs(data.endDate).toDate(),
      alram: data.alram,
      isChecked: false,
    };

    addTodo(matrixId, matrixType, todo);
    navigation.goBack();
  };

  return (
    <Form
      onScroll={() => Keyboard.dismiss()}
      onClose={() => navigation.goBack()}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <Dropdown
        label="카테고리 선택"
        placeholder="카테고리를 선택해주세요"
        name="categoryId"
        control={control}
        errors={errors.categoryId}
        options={matrixs.map((item) => {
          return {
            label: item.category,
            value: item.id.toString(),
          };
        })}
      />
      <Input
        label="할 일 작성"
        name="content"
        placeholder="할 일을 작성해주세요"
        control={control}
        errors={errors.content}
        errorMessage={errors.content?.message}
        rules={{
          required: '할 일을 작성해주세요.',
          minLength: 1,
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
        name="endDate"
        control={control}
        errors={errors.endDate}
        errorMessage={errors.endDate?.message}
        placeholder="마감 날짜/시간을 선택해주세요"
        rules={{
          required: '마감 날짜/시간을 선택해주세요.',
          validate: {
            isDate: (value) => !Number.isNaN(Date.parse(value)) || '유효한 날짜를 입력해주세요.',
          },
        }}
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
  );
};

export default MatrixAdd;