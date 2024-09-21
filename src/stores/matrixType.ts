import { create } from 'zustand';

import { MatrixType } from '@/types/matrix.ts';

type MatrixStoreType = {
  matrixType: keyof MatrixType['matrixs'] | '';
  setMatrixType: (matrixType: keyof MatrixType['matrixs'] | '') => void;
};

export const useMatrixTypeStore = create<MatrixStoreType>((set) => ({
  matrixType: '',
  setMatrixType: (matrixType) => set({ matrixType }),
}));
