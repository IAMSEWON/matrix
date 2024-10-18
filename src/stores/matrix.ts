import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

import { MatrixType, TodoAddType, TodoType, TodoUpdateType } from '@/types/matrix.ts';

type MatrixStoreType = {
  matrix: MatrixType | null;
  matrixs: MatrixType[];
  // 매트릭스 핸들러
  selectedMatrix: (id: number) => void;
  createdMatrix: (categoryName: string) => void;
  updatedMatrix: (id: number, name: string) => void;
  deletedMatrix: (id: number) => void;
  // 매트릭스 할 일 핸들러
  createdTodo: (todo: TodoAddType) => number;
  updatedTodo: (todo: TodoUpdateType) => void;
  deletedTodo: ({ categoryId, todoId }: { categoryId: number; todoId: number }) => void;
  checkedTodo: ({ categoryId, todoId }: { categoryId: number; todoId: number }) => void;
  resetMatrixs: () => void;
};

const useMatrixStore = create(
  persist<MatrixStoreType>(
    (set) => ({
      // 선택된 매트릭스 객체
      matrix: null,
      // 매트릭스 리스트
      matrixs: [],
      // 매트릭스 선택 함수
      selectedMatrix: (id) => set((state) => ({ matrix: state.matrixs.find((matrix) => matrix.categoryId === id) })),
      // 매트릭스 추가하는데 아이디는 1부터 증가하고
      // matrixs 배열의 데이터가 없을 경우 matrix 객체에 데이터 추가
      createdMatrix: (categoryName) =>
        set((state) => {
          const newMatrix: MatrixType = {
            categoryId: (state.matrixs[state.matrixs.length - 1]?.categoryId ?? 0) + 1,
            categoryName,
            matrixs: [],
          };

          return !state.matrix
            ? { matrix: newMatrix, matrixs: [...state.matrixs, newMatrix] }
            : { matrixs: [...state.matrixs, newMatrix] };
        }),

      // 매트릭스 수정 함수
      updatedMatrix: (id, name) =>
        set((state) => {
          // 수정할 매트릭스의 인덱스 값
          const index = state.matrixs.findIndex((_matrix) => _matrix.categoryId === id);

          // 수정할 매트릭스 데이터
          const updatedMatrix = {
            ...state.matrixs[index],
            categoryName: name,
          };

          return { matrixs: [...state.matrixs.slice(0, index), updatedMatrix, ...state.matrixs.slice(index + 1)] };
        }),
      // 매트릭스 삭제 함수
      // 삭제할 id와 matrix id 값이 동일한 경우 삭제 후 matrix 초기화
      // 만약 matrixs 데이터가 있으면 지운 matrixs에 0번째 인덱스 값으로 matrix 초기화
      deletedMatrix: (id) =>
        set((state) => {
          const updatedMatrixs = state.matrixs.filter((matrix) => matrix.categoryId !== id);

          if (state.matrix?.categoryId === id) {
            return {
              matrix: updatedMatrixs.length > 0 ? updatedMatrixs[0] : null,
              matrixs: updatedMatrixs,
            };
          }

          return { matrixs: updatedMatrixs };
        }),

      // 할 일 추가 함수

      // 할 일 추가 시 categoryId 값은 선택된 matrix의 categoryId 값
      createdTodo: (todo) => {
        let todoIdValue = 0;

        set((state) => {
          const { categoryId } = todo;

          const selectedCategory = state.matrixs.find((matrix) => matrix.categoryId === categoryId);

          if (!selectedCategory) return state;

          todoIdValue = (selectedCategory.matrixs[selectedCategory.matrixs.length - 1]?.todoId ?? 0) + 1;

          const newTodo: TodoType = {
            todoId: todoIdValue,
            startDate: dayjs().toDate(),
            isChecked: false,
            ...todo,
          };

          const updateMatrix = {
            ...selectedCategory,
            matrixs: [...selectedCategory.matrixs, newTodo],
          };

          return state.matrix?.categoryId === categoryId
            ? {
                matrix: updateMatrix,
                matrixs: state.matrixs.map((matrix) => (matrix.categoryId === categoryId ? updateMatrix : matrix)),
              }
            : { matrixs: state.matrixs.map((matrix) => (matrix.categoryId === categoryId ? updateMatrix : matrix)) };
        });

        return todoIdValue;
      },

      /*
       *  투두 업데이트 함수
       * @param {TodoUpdateType} todo - 업데이트 할 투두 객체
       *
       * 만약 importance 값이 변경되면 기존 importance 값의 투두를 삭제하고 새로운 importance 값의 투두에 추가
       * 새로운 importance 값의 투두에 추가할 때는 todoId 값은 importance 값의 투두 배열의 길이 + 1
       * */
      updatedTodo: (todo) =>
        set((state) => {
          const { categoryId } = todo;

          const selectedCategory = state.matrixs.find((matrix) => matrix.categoryId === categoryId);

          if (!selectedCategory) return state;

          const index = selectedCategory.matrixs.findIndex((_todo) => _todo.todoId === todo.todoId);

          const updatedTodo = {
            ...selectedCategory.matrixs[index],
            ...todo,
          };

          const updateMatrix = {
            ...selectedCategory,
            matrixs: [
              ...selectedCategory.matrixs.slice(0, index),
              updatedTodo,
              ...selectedCategory.matrixs.slice(index + 1),
            ],
          };

          return state.matrix?.categoryId === categoryId
            ? {
                matrix: updateMatrix,
                matrixs: state.matrixs.map((matrix) => (matrix.categoryId === categoryId ? updateMatrix : matrix)),
              }
            : { matrixs: state.matrixs.map((matrix) => (matrix.categoryId === categoryId ? updateMatrix : matrix)) };
        }),

      // 할 일 삭제 함수
      deletedTodo: (todo) =>
        set((state) => {
          const { categoryId, todoId } = todo;

          const selectedCategory = state.matrixs.find((matrix) => matrix.categoryId === categoryId);

          if (!selectedCategory) return state;

          const updatedMatrixs = selectedCategory.matrixs.filter((_todo) => _todo.todoId !== todoId);

          const updateMatrix = {
            ...selectedCategory,
            matrixs: updatedMatrixs,
          };

          return state.matrix?.categoryId === categoryId
            ? {
                matrix: updateMatrix,
                matrixs: state.matrixs.map((matrix) => (matrix.categoryId === categoryId ? updateMatrix : matrix)),
              }
            : { matrixs: state.matrixs.map((matrix) => (matrix.categoryId === categoryId ? updateMatrix : matrix)) };
        }),
      checkedTodo: (todo) =>
        set((state) => {
          const { categoryId, todoId } = todo;

          const selectedCategory = state.matrixs.find((matrix) => matrix.categoryId === categoryId);

          if (!selectedCategory) return state;

          const index = selectedCategory.matrixs.findIndex((_todo) => _todo.todoId === todoId);

          const updatedTodo = {
            ...selectedCategory.matrixs[index],
            isChecked: !selectedCategory.matrixs[index].isChecked,
          };

          const updateMatrix = {
            ...selectedCategory,
            matrixs: [
              ...selectedCategory.matrixs.slice(0, index),
              updatedTodo,
              ...selectedCategory.matrixs.slice(index + 1),
            ],
          };

          return state.matrix?.categoryId === categoryId
            ? {
                matrix: updateMatrix,
                matrixs: state.matrixs.map((matrix) => (matrix.categoryId === categoryId ? updateMatrix : matrix)),
              }
            : { matrixs: state.matrixs.map((matrix) => (matrix.categoryId === categoryId ? updateMatrix : matrix)) };
        }),

      // 매트릭스 초기화 함수
      resetMatrixs: () => set({ matrix: null, matrixs: [] }),
    }),
    {
      name: 'matrix-storage',
      storage: createJSONStorage(() => AsyncStorage),
    } as PersistOptions<MatrixStoreType>,
  ),
);

export default useMatrixStore;
