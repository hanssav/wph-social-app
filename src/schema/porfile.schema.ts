import z from 'zod';
import { RegisterSchema } from './auth.schema';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const BaseProfileSchema = RegisterSchema.pick({
  name: true,
  username: true,
  email: true,
}).extend({
  phone: z.union([
    z.string().regex(/^08[0-9]{8,11}$/, 'Phone number must start with 08 and be valid'),
    z.literal(''),
  ]),
});

export const UpdateProfileSchema = BaseProfileSchema.extend({
  bio: z.union([
    z.string().max(160, 'Bio must be at most 160 characters'),
    z.literal(''),
  ]).optional(),
  avatarUrl: z.union([
    z.string().url('Invalid avatar URL'),
    z.literal(''),
  ]).optional(),
  avatar: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      'Avatar must be less than 5MB'
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Avatar must be a PNG, JPG, or WEBP image'
    ),
});

export type UpdateProfileRequest = z.infer<typeof UpdateProfileSchema>;
