import { MatrixKeyType } from '@/types/matrix.ts';

export type TabStackParamList = {
  HomeStack: undefined;
  MatrixAdd: undefined;
  CalendarStack: undefined;
};
export type RootStackParamList = {
  Guide: undefined;
  Main: undefined;
};
export type HomeStackParamList = {
  Home: undefined;
  MatrixTodo: {
    matrixType: MatrixKeyType;
  };
  MatrixAdd: undefined;
  Category: undefined;
  Setting: undefined;
};
export type MatrixStackParamList = {
  MatrixAdd: undefined;
};

export type CalendarStackParamList = {
  Main: undefined;
};
