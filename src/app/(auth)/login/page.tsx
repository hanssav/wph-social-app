'use client';

import { FormFields } from '@/components/container';
import {
  AuthCardBtnAction,
  AuthCCard,
} from '@/components/pages/auth/auth-card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { loginFields, loginSection } from '@/constants/auth.constants';
import { useLogin } from '@/hooks';

export default function LoginPage() {
  const { footer, title, btnLabel } = loginSection;
  const { form, loginMutation, onSubmit } = useLogin();

  return (
    <AuthCCard title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          {loginFields.map((item) => (
            <FormFields key={item.name} control={form.control} config={item} />
          ))}
          <Button
            type='submit'
            className='w-full h-12'
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? btnLabel.isPending : btnLabel.iddle}
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
