import React from 'react';
import { Control, FieldErrors, UseFormReturn } from 'react-hook-form';
import { FormFields } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { profileFormFields } from '@/constants/profile.constants';
import { UpdateProfileRequest } from '@/schema/porfile.schema';

interface ProfileFormSectionProps {
  form: UseFormReturn<UpdateProfileRequest>;
  control: Control<UpdateProfileRequest>;
  onSubmit: (data: UpdateProfileRequest) => void;
  isSubmitting: boolean;
  handleError: (errors: FieldErrors) => void;
}

export const ProfileFormSection: React.FC<ProfileFormSectionProps> = ({
  form,
  control,
  onSubmit,
  isSubmitting,
  handleError,
}) => {
  return (
    <div className='flex-1 w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, handleError)}
          className='w-full space-y-4'
        >
          {profileFormFields.map((field) => (
            <FormFields key={field.name} control={control} config={field} />
          ))}

          <Button type='submit' className='w-full h-12' disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
