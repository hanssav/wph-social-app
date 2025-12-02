'use client';

import { FormFields } from '@/components/container';
import {
  AuthCardBtnAction,
  AuthCCard,
} from '@/components/psges/auth/auth-card';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { registerFields, registerSection } from '@/constants/auth.constants';
import { useRegister } from '@/hooks/use-register';

export default function Register() {
  const { footer, title, btnLabel } = registerSection;
  const { form, onSubmit, registerMutation } = useRegister();

  return (
    <AuthCCard title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          {registerFields.map((item) => (
            <FormFields key={item.name} control={form.control} config={item} />
          ))}
          <Button
            type='submit'
            className='w-full h-12'
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? btnLabel.isPending : btnLabel.iddle}
          </Button>
          <AuthCardBtnAction
            q={footer.question}
            a={footer.answer}
            src={footer.src}
          />
        </form>
      </Form>
    </AuthCCard>
  );
}
