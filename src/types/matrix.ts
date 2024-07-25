export type TodoType = {
  todo: {
    id: number;
    content: string;
    isDone: boolean;
  };
};

export type MatrixType = {
  id: number;
  isSelect: boolean;
  category: string;
  categoryBackgroundColor: string;
  matrixs: {
    doit: {
      backgroundColor?: string;
      contents: TodoType[];
    };
    schedule: {
      backgroundColor?: string;
      contents: TodoType[];
    };
    delegate: {
      backgroundColor?: string;
      contents: TodoType[];
    };
    eliminate: {
      backgroundColor?: string;
      contents: TodoType[];
    };
  };
};
