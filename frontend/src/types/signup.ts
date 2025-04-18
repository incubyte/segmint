
export type QuestionType = 'text' | 'email' | 'password' | 'select' | 'multiSelect';

export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  description?: string;
  placeholder?: string;
  options?: Option[];
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
}

export interface SignupFormData {
  [key: string]: string | string[];
}
