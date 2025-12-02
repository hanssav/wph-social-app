export type FieldType =
  | 'text'
  | 'password'
  | 'email'
  | 'textarea'
  | 'file'
  | 'number'
  | 'select';

export type FormFieldType = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  autoComplete?: string;

  options?: { label: string; value: number }[];
};
