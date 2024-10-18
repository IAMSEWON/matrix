type YNType = 'Y' | 'N';

// 매트릭스 4분면의 타입
export type MatrixKeyType = 'doit' | 'schedule' | 'delegate' | 'eliminate';

// 매트릭스 객체 matrixs 타입
export type MatrixsType = Record<MatrixKeyType, TodoType[]>;

// 할 일 작성 타입
export type TodoType = {
  todoId: number;
  content: string;
  isChecked: boolean;
  startDate?: Date;
  endDate?: Date;
  importance: MatrixKeyType;
  alram: YNType;
  alramTime?: string;
};

// 할 일 등록 시 타입
export type TodoAddType = Omit<TodoType, 'todoId' | 'isChecked'> & { categoryId: number };

// 할 일 등록 시 타입
export type TodoUpdateType = Omit<TodoType, 'isChecked'> & { categoryId: number };

// 매트릭스 타입
export type MatrixType = {
  categoryId: number;
  categoryName: string;
  matrixs: TodoType[];
};
