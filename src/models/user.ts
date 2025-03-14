export type USER = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  salt: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  token: string;
};

export type LOGIN_PAYLOAD = Pick<USER, 'email' | 'password'>;

export type SIGNUP_PAYLOAD = Pick<
  USER,
  'firstName' | 'lastName' | 'email' | 'password'
>;
