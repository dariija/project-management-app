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

export type Board = {
  id: string;
} & BoardInfo;
