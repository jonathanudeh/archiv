export type LoginData = {
  email: string;
  password: string;
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type ResetPasswordData = {
  password: string;
  passwordConfirm: string;
};
