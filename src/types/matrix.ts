export type TodoType = {
  id: number;
  content: string;
  isDone: boolean;
  endDate: Date;
  alram: 'Y' | 'N';
};

export type MatrixMenuType = {
  backgroundColor?: string;
  contents: TodoType[];
};

export type MatrixType = {
  id: number;
  category: string;
  categoryBackgroundColor: string;
  matrixs: {
    doit: MatrixMenuType;
    schedule: MatrixMenuType;
    delegate: MatrixMenuType;
    eliminate: MatrixMenuType;
  };
};

export type MatrixAddType = {
  categoryId: string;
  content: string;
  alram: 'Y' | 'N';
  endDate: string;
  importance: keyof MatrixType['matrixs'];
};
