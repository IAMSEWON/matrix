import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

import { MatrixType, TodoType } from '@/types/matrix.ts';

type MatrixStoreType = {
  matrix: MatrixType | null;
  matrixs: MatrixType[];
  addMatrix: (matrix: Omit<MatrixType, 'id' | 'matrixs' | 'isSelect'>) => void;
  deleteMatrix: (id: number) => void;
  selectMatrix: (id: number) => void;
  addTodo: (matrixId: number, matrixType: keyof MatrixType['matrixs'], todo: Omit<TodoType, 'id'>) => void;
  deleteTodo: (matrixId: number, matrixType: keyof MatrixType['matrixs'], todoId: number) => void;
};

const useMatrixStore = create(
  persist<MatrixStoreType>(
    (set) => ({
      matrix: null,
      matrixs: [],
      addMatrix: (matrix) =>
        set((state) => {
          const newMatrix = {
            ...matrix,
            id: state.matrixs.length ? state.matrixs[state.matrixs.length - 1].id + 1 : 1,
            isSelect: state.matrixs.length === 0,
            matrixs: {
              doit: { backgroundColor: undefined, contents: [] },
              schedule: { backgroundColor: undefined, contents: [] },
              delegate: { backgroundColor: undefined, contents: [] },
              eliminate: { backgroundColor: undefined, contents: [] },
            },
          };
          return { matrixs: [...state.matrixs, newMatrix] };
        }),
      // matrix와 matrixs 상태에 둘다 저장
      selectMatrix: (id) => set((state) => ({ matrix: state.matrixs.find((matrix) => matrix.id === id) })),
      deleteMatrix: (id) => set((state) => ({ matrixs: state.matrixs.filter((matrix) => matrix.id !== id) })),
      addTodo: (matrixId, matrixType, todo) =>
        set((state) => {
          const matrixIndex = state.matrixs.findIndex((matrix) => matrix.id === matrixId);
          const matrix = state.matrixs[matrixIndex];
          const newTodo = {
            ...todo,
            id: matrix.matrixs[matrixType].contents.length
              ? matrix.matrixs[matrixType].contents[matrix.matrixs[matrixType].contents.length - 1].todo.id + 1
              : 1,
          };
          const newMatrix = {
            ...matrix,
            matrixs: {
              ...matrix.matrixs,
              [matrixType]: {
                ...matrix.matrixs[matrixType],
                contents: [...matrix.matrixs[matrixType].contents, newTodo],
              },
            },
          };
          const matrixs = [...state.matrixs];
          matrixs[matrixIndex] = newMatrix;
          return { matrixs };
        }),
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
                contents: matrix.matrixs[matrixType].contents.filter((todo) => todo.todo.id !== todoId),
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
