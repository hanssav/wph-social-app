import { FormFieldType } from '@/types';
import { PATH } from './path.constants';

export const loginFields: FormFieldType[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    autoComplete: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
];

export type AuthSectionProps = {
  title: string;
  footer: {
    question: string;
    answer: string;
    src: string;
  };
  btnLabel: {
    iddle: string;
    isPending: string;
  };
};

export const loginSection: AuthSectionProps = {
  title: 'Welcome Back!',
  footer: {
    question: "Don't have an account?",
    answer: 'Register',
    src: PATH.REGISTER,
  },
  btnLabel: {
    iddle: 'Login',
    isPending: 'Logging in...',
  },
};

export const registerFields: FormFieldType[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter your name',
    type: 'text',
    autoComplete: 'name',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    autoComplete: 'email',
  },
  {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    autoComplete: 'username',
  },
  {
    name: 'phone',
    label: 'Number Phone',
    placeholder: 'Enter your number phone',
    type: 'number',
    autoComplete: 'tel',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    autoComplete: 'new-password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Enter your confirm password',
    type: 'password',
    autoComplete: 'new-password',
  },
];

export const registerSection: AuthSectionProps = {
  title: 'Register',
  footer: {
    question: 'Already have an account??',
    answer: 'Login',
    src: PATH.LOGIN,
  },
  btnLabel: {
    iddle: 'Register',
    isPending: 'Registering...',
  },
};
