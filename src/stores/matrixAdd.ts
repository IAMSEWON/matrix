import { create } from 'zustand';

import { MatrixKeyType, TodoUpdateType } from '@/types/matrix.ts';

type MatrixStoreType = {
  isVisibleMatrixAdd: boolean;
  setIsVisibleMatrixAdd: (isVisibleMatrixAdd: boolean) => void;
  matrixType: MatrixKeyType | '';
  setMatrixType: (matrixType: MatrixKeyType | '') => void;
  editMatrix: TodoUpdateType | null;
  setEditMatrix: (editMatrix: TodoUpdateType | null) => void;
};

export const useMatrixAdd = create<MatrixStoreType>((set) => ({
  isVisibleMatrixAdd: false,
  setIsVisibleMatrixAdd: (isVisibleMatrixAdd) => set({ isVisibleMatrixAdd }),
  matrixType: '',
  setMatrixType: (matrixType) => set({ matrixType }),
  editMatrix: null,
  setEditMatrix: (editMatrix) => set({ editMatrix }),
}));
