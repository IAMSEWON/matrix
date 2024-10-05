import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Platform, Pressable, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { SquarePlus } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

import CategoryForm from '@/components/CategoryForm.tsx';
import DatePickerButton from '@/components/Form/DatePickerButton.tsx';
import Form from '@/components/Form/Form.tsx';
import Input from '@/components/Form/Input.tsx';
import RadioGroup from '@/components/Form/RadioGroup.tsx';
import WheelPicker from '@/components/Form/WheelPicker.tsx';
import { ALRAM_TIME } from '@/constants.ts';
import useMatrixStore from '@/stores/matrix.ts';
import { useMatrixAdd } from '@/stores/matrixAdd.ts';
import { TodoAddType } from '@/types/matrix.ts';
import { HomeStackParamList } from '@/types/navigation.ts';
import { onCreateTriggerNotification } from '@/utils/notifications.ts';

type MatrixAddNavigationProp = NativeStackScreenProps<HomeStackParamList, 'MatrixAdd'>;

// 할 일 작성 초기화 값
const resetTodoValue: TodoAddType = {
  categoryId: 0,
  content: '',
  importance: 'doit',
  endDate: undefined,
  alram: 'N',
  alramTime: undefined,
};

const MatrixAdd = ({ route, navigation }: MatrixAddNavigationProp) => {
  const { isVisibleMatrixAdd, setIsVisibleMatrixAdd, matrixType, editMatrix, setEditMatrix } = useMatrixAdd();

  const [isVisibleCategory, setIsVisibleCategory] = useState<boolean>(false);

  const { matrix, matrixs, createdTodo, updatedTodo } = useMatrixStore();

  const { colorScheme } = useColorScheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<TodoAddType>({
    defaultValues: resetTodoValue,
  });

  const onPressIconHandler = () => {
    if (matrixs.length === 0) {
      Alert.alert('카테고리를 먼저 추가해주세요.', '', [
        { text: '취소', onPress: () => null },
        { text: '카테고리 추가', onPress: () => setIsVisibleCategory(true) },
      ]);
    } else if (!matrix) {
      Alert.alert('카테고리를 선택해주세요.', '', [
        { text: '취소', onPress: () => null },
        { text: '카테고리 선택', onPress: () => navigation.navigate('Category') },
      ]);
    } else {
      setIsVisibleMatrixAdd(true);
    }
  };

  const onResetHandler = () => {
    reset(resetTodoValue);
  };

  const onCloseHandler = () => {
    setIsVisibleMatrixAdd(false);
    setEditMatrix(null);
    onResetHandler();
  };

  const onTriggerTodoHandler = async (id: string, todo: Omit<TodoAddType, 'todoId'>) => {
    const { alram, alramTime, endDate, content } = todo;

    // 알람 시간이 설정되었을 경우 푸시 알람 보내기
    if (alram === 'Y' && alramTime) {
      // 알람 시간
      const todoAlramTime = parseInt(alramTime, 10);

      // 마감 시간
      const todoEndDate = dayjs(endDate).subtract(todoAlramTime, 'minute').toDate();

      // 메세지
      const body =
        (alramTime as keyof typeof ALRAM_TIME) === '0'
          ? '마감되었습니다.'
          : `마감 ${ALRAM_TIME[alramTime as keyof typeof ALRAM_TIME]} 전 입니다.`;

      await onCreateTriggerNotification({
        id,
        time: todoEndDate,
        title: `${content}가`,
        body: `${body}`,
      });
    }
  };

  const onSubmitHandler = async (data: TodoAddType) => {
    // 알람 설정 체크되어있는데 알람 시간을 미체크했을 경우 경고
    if (data.alram === 'Y' && !data.alramTime) {
      Alert.alert('알람 시간을 선택해주세요.');
      return;
    }

    await onTriggerTodoHandler(`${matrix?.categoryId}-${data.categoryId}`, { ...data });

    if (editMatrix) {
      updatedTodo({
        ...data,
        todoId: editMatrix.todoId,
      });
    } else {
      createdTodo(data);
    }

    setIsVisibleMatrixAdd(false);
    onResetHandler();
  };

  useEffect(() => {
    if (isVisibleMatrixAdd && matrix?.categoryId) {
      setValue('categoryId', matrix.categoryId);
    }
  }, [matrix, isVisibleMatrixAdd]);

  useEffect(() => {
    // todo 페이지에서 추가 버튼 클릭 시 중요도 값 설정
    if (isVisibleMatrixAdd && matrixType) {
      setValue('importance', matrixType);
    }
  }, [matrixType, isVisibleMatrixAdd]);

  useEffect(() => {
    // 업데이트 시 데이터 초기화
    if (isVisibleMatrixAdd && editMatrix) {
      if (editMatrix.categoryId !== undefined) setValue('categoryId', editMatrix.categoryId);
      if (editMatrix.content !== undefined) setValue('content', editMatrix.content);
      if (editMatrix.endDate !== undefined) setValue('endDate', editMatrix.endDate);
      if (editMatrix.alram !== undefined) setValue('alram', editMatrix.alram);
      if (editMatrix.alramTime !== undefined) setValue('alramTime', editMatrix.alramTime);
    }
  }, [matrixType, editMatrix, isVisibleMatrixAdd]);

  return (
    <View>
      <Pressable
        style={{
          marginTop: Platform.OS === 'android' ? 12 : 18,
          marginHorizontal: 48,
          alignItems: 'center',
        }}
        onPress={onPressIconHandler}
      >
        <SquarePlus size={28} className="font-semibold" color={colorScheme === 'light' ? 'black' : 'white'} />
      </Pressable>
      <Form isVisble={isVisibleMatrixAdd} onClose={onCloseHandler} onSubmit={handleSubmit(onSubmitHandler)}>
        <WheelPicker
          options={matrixs.map((item) => {
            return {
              label: item.categoryName,
              value: item.categoryId.toString(),
            };
          })}
          label="카테고리 선택"
          placeholder="카테고리를 선택해주세요"
          name="categoryId"
          control={control}
          title="키테고리 선택"
          errors={errors.categoryId}
          darkMode={colorScheme === 'dark'}
          defaultValue={matrix?.categoryId.toString()}
        />
        <Input
          label="할 일 작성"
          name="content"
          placeholder="할 일을 작성해주세요"
          control={control}
          errors={errors.content}
          errorMessage={errors.content?.message}
          darkMode={colorScheme === 'dark'}
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
          defaultValue={matrixType}
        />
        <DatePickerButton
          label="마감 날짜/시간 선택"
          name="endDate"
          control={control}
          errors={errors.endDate}
          errorMessage={errors.endDate?.message}
          placeholder="마감 날짜/시간을 선택해주세요"
          title="마감 날짜/시간 선택"
          rules={{
            required: '마감 날짜/시간을 선택해주세요.',
            validate: {
              isDate: (value) => !Number.isNaN(Date.parse(value as string)) || '유효한 날짜를 입력해주세요.',
            },
          }}
          darkMode={colorScheme === 'dark'}
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
          darkMode={colorScheme === 'dark'}
        />
        {watch().alram === 'Y' && (
          <WheelPicker
            options={[
              { label: '마감 시간', value: '0' },
              { label: '5분 전', value: '5' },
              { label: '10분 전', value: '10' },
              { label: '15분 전', value: '15' },
              { label: '30분 전', value: '30' },
              { label: '1시간 전', value: '60' },
              { label: '2시간 전', value: '120' },
              { label: '1일 전', value: '1440' },
            ]}
            control={control}
            name="alramTime"
            title="알림 시간 선택"
            placeholder="알림 시간을 선택해주세요"
            errors={errors.alramTime}
            errorMessage={errors.alramTime?.message}
            darkMode={colorScheme === 'dark'}
            rules={{
              required: '알림 시간을 선택해주세요.',
            }}
          />
        )}
      </Form>
      <CategoryForm matrixs={matrixs} open={isVisibleCategory} onClose={() => setIsVisibleCategory(false)} />
    </View>
  );
};

export default MatrixAdd;
