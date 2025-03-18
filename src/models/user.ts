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

export type USER_RESPONSE = {
  data: USER;
};

// User details
export type USER_UPDATE = Pick<USER, 'firstName' | 'lastName'>;

// User password
export type USER_PASSWORD = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

// CRUD Methods
export interface USER_DETAILS {
  isOpen?: boolean;
  toggle: () => void;
}

export interface CHANGE_PASSWORD {
  isOpen?: boolean;
  toggle: () => void;
}
