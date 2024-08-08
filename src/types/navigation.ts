import { MatrixType } from '@/types/matrix.ts';

export type RootStackParamList = {
  HomeStack: undefined;
  Post: undefined;
  CalendarStack: undefined;
};
export type HomeStackParamList = {
  Home: undefined;
  MatrixTodo: {
    matrixType: keyof MatrixType['matrixs'];
  };
  MatrixAdd: undefined;
  Category: undefined;
};
export type MatrixStackParamList = {
  MatrixAdd: undefined;
};

export type CalendarStackParamList = {
  Main: undefined;
};
