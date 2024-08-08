import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

import { MatrixType, TodoType } from '@/types/matrix.ts';

type MatrixStoreType = {
  matrix: MatrixType | null;
  matrixs: MatrixType[];
  addMatrix: (matrix: Omit<MatrixType, 'id' | 'matrixs'>) => void;
  deleteMatrix: (id: number) => void;
  updateMatrix: (id: number, matrix: Omit<MatrixType, 'id' | 'matrixs'>) => void;
  selectMatrix: (id: number) => void;
  addTodo: (matrixId: number, matrixType: keyof MatrixType['matrixs'], content: Omit<TodoType, 'id'>) => void;
  deleteTodo: (matrixId: number, matrixType: keyof MatrixType['matrixs'], todoId: number) => void;
  toggleTodoChecked: (matrixId: number, matrixType: keyof MatrixType['matrixs'], todoId: number) => void;
};

const useMatrixStore = create(
  persist<MatrixStoreType>(
    (set) => ({
      matrix: null,
      matrixs: [],
      // 새로운 매트릭스를 추가하는 함수
      addMatrix: (matrix) =>
        set((state) => {
          const newMatrix = {
            ...matrix,
            id: state.matrixs.length ? state.matrixs[state.matrixs.length - 1].id + 1 : 1,
            matrixs: {
              doit: { backgroundColor: undefined, contents: [] },
              schedule: { backgroundColor: undefined, contents: [] },
              delegate: { backgroundColor: undefined, contents: [] },
              eliminate: { backgroundColor: undefined, contents: [] },
            },
          };
          return { matrixs: [...state.matrixs, newMatrix] };
        }),
      // 매트릭스를 선택하는 함수
      selectMatrix: (id) => set((state) => ({ matrix: state.matrixs.find((matrix) => matrix.id === id) })),
      // 매트릭스를 업데이트하는 함수
      updateMatrix: (id, matrix) =>
        set((state) => {
          const matrixIndex = state.matrixs.findIndex((_matrix) => _matrix.id === id);
          const newMatrix = { ...state.matrixs[matrixIndex], ...matrix };
          const matrixs = [...state.matrixs];
          matrixs[matrixIndex] = newMatrix;
          return { matrixs };
        }),
      // 매트릭스를 삭제하는 함수
      deleteMatrix: (id) => set((state) => ({ matrixs: state.matrixs.filter((matrix) => matrix.id !== id) })),
      // 매트릭스에 할 일을 추가하는 함수
      addTodo: (matrixId, matrixType, todo) =>
        set((state) => {
          // 현재 선택된 매트릭스를 업데이트
          const selectedMatrix = state.matrixs.find((matrix) => matrix.id === matrixId);
          if (!selectedMatrix) return state;

          // 새로운 할 일 추가 로직
          const newTodo: TodoType = {
            ...todo,
            id: selectedMatrix.matrixs[matrixType].contents.length
              ? selectedMatrix.matrixs[matrixType].contents[selectedMatrix.matrixs[matrixType].contents.length - 1].id +
                1
              : 1,
          };

          const newMatrix = {
            ...selectedMatrix,
            matrixs: {
              ...selectedMatrix.matrixs,
              [matrixType]: {
                ...selectedMatrix.matrixs[matrixType],
                contents: [...selectedMatrix.matrixs[matrixType].contents, newTodo],
              },
            },
          };
          const matrixs = state.matrixs.map((matrix) => (matrix.id === matrixId ? newMatrix : matrix));

          return { matrixs, matrix: newMatrix };
        }),
      toggleTodoChecked: (matrixId, matrixType, todoId) =>
        set((state) => {
          const matrixIndex = state.matrixs.findIndex((matrix) => matrix.id === matrixId);
          if (matrixIndex === -1) return state;

          const matrix = state.matrixs[matrixIndex];
          const todoIndex = matrix.matrixs[matrixType].contents.findIndex((todo) => todo.id === todoId);
          if (todoIndex === -1) return state;

          const updatedTodo = {
            ...matrix.matrixs[matrixType].contents[todoIndex],
            isChecked: !matrix.matrixs[matrixType].contents[todoIndex].isChecked,
          };

          const updatedMatrix = {
            ...matrix,
            matrixs: {
              ...matrix.matrixs,
              [matrixType]: {
                ...matrix.matrixs[matrixType],
                contents: [
                  ...matrix.matrixs[matrixType].contents.slice(0, todoIndex),
                  updatedTodo,
                  ...matrix.matrixs[matrixType].contents.slice(todoIndex + 1),
                ],
              },
            },
          };

          const updatedMatrixs = [...state.matrixs];
          updatedMatrixs[matrixIndex] = updatedMatrix;

          const updatedState = { matrixs: updatedMatrixs, matrix: state.matrix };
          if (state.matrix?.id === matrixId) {
            updatedState.matrix = updatedMatrix;
          }

          return updatedState;
        }),
      // 매트릭스에서 할 일을 삭제하는 함수
      deleteTodo: (matrixId, matrixType, todoId) =>
        set((state) => {
          const matrixIndex = state.matrixs.findIndex((matrix) => matrix.id === matrixId);
          const matrix = state.matrixs[matrixIndex];
          const newMatrix = {
            ...matrix,
            matrixs: {
              ...matrix.matrixs,
              [matrixType]: {
                ...matrix.matrixs[matrixType],
                contents: matrix.matrixs[matrixType].contents.filter((todo) => todo.id !== todoId),
              },
            },
          };
          const matrixs = [...state.matrixs];
          matrixs[matrixIndex] = newMatrix;
          return { matrixs };
        }),
    }),
    {
      name: 'matrix-storage',
      storage: createJSONStorage(() => AsyncStorage),
    } as PersistOptions<MatrixStoreType>,
  ),
);

export default useMatrixStore;
