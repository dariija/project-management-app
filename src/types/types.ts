export type User = {
  id: string;
  name: string;
  login: string;
};

export type UserToken = {
  token: string;
};

export type SigninFormInput = {
  login: string;
  password: string;
};

export type SignupFormInput = {
  name: string;
  login: string;
  password: string;
};

export type BoardInfo = {
  title: string;
  description: string;
};
export type Board = { id: string } & BoardInfo;
export type BoardFullData = { id: string } & BoardInfo & {
    columns: [] | ColumnFullData[];
  };

export type ColumnInfo = {
  title: string;
  order?: number;
  boardId?: string | null;
};
export type Column = { id: string } & ColumnInfo;
export type ColumnFullData = { id: string } & ColumnInfo & { tasks: [] | TaskFullData[] };

export type TaskInfo = {
  title: string;
  order?: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};
export type Task = { id: string } & TaskInfo;
export type TaskFullData = { id: string } & TaskInfo & { files: [] | TaskFile[] };

export type TaskFile = {
  filename: string;
  fileSize: number;
};
