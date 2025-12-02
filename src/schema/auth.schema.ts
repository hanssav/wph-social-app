import { z } from 'zod';

export const RegisterSchema = z
  .object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    username: z.string().min(3, 'Username minimal 3 karakter'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().regex(/^08[0-9]{8,11}$/, 'Nomor HP harus 08xx dan valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z
      .string()
      .min(6, 'Konfirmasi password minimal 6 karakter'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Konfirmasi password tidak cocok',
        path: ['confirmPassword'], // error muncul di field confirmPassword
      });
    }
  });

export type RegisterRequest = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

export type LoginRequest = z.infer<typeof LoginSchema>;
