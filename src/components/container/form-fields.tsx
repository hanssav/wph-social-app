import type { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { FormFieldType } from '@/types';

type Props<T extends FieldValues> = {
  control: Control<T>;
  config: FormFieldType;
};

export const FormFields = <T extends FieldValues>({
  control,
  config,
}: Props<T>) => {
  // add options params if needed selects
  const { type, placeholder, autoComplete, disabled } = config;

  return (
    <FormField
      control={control}
      name={config.name as Path<T>}
      render={({ field }) => {
        let InputComponent: React.ReactNode = null;

        switch (type) {
          case 'textarea':
            InputComponent = (
              <Textarea
                placeholder={placeholder}
                {...field}
                value={field.value ?? ''}
                disabled={disabled}
                className='min-h-[100px] max-h-96 resize-none overflow-y-auto'
              />
            );
            break;

          // case 'select':
          //   InputComponent = (
          //     <Select
          //       onValueChange={field.onChange}
          //       value={field.value ? String(field.value) : ''}
          //     >
          //       <SelectTrigger>
          //         <SelectValue placeholder={placeholder || 'Select...'} />
          //       </SelectTrigger>
          //       <SelectContent>
          //         {options?.map((opt) => (
          //           <SelectItem key={opt.value} value={String(opt.value)}>
          //             {opt.label}
          //           </SelectItem>
          //         ))}
          //       </SelectContent>
          //     </Select>
          //   );
          //   break;

          case 'number':
            InputComponent = (
              <Input
                type='number'
                placeholder={placeholder}
                {...field}
                value={field.value ?? ''}
                disabled={disabled}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            );
            break;

          case 'file':
            InputComponent = (
              <Input
                type='file'
                disabled={disabled}
                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
              />
            );
            break;

          default:
            InputComponent = (
              <Input
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                {...field}
                value={field.value ?? ''}
                disabled={disabled}
              />
            );
            break;
        }

        return (
          <FormItem className='min-h-0'>
            <FormLabel>{config.label}</FormLabel>
            <FormControl>{InputComponent}</FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
