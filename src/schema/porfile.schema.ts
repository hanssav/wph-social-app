import z from 'zod';
import { RegisterSchema } from './auth.schema';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const BaseProfileSchema = RegisterSchema.pick({
  name: true,
  username: true,
  phone: true,
});

export const UpdateProfileSchema = BaseProfileSchema.extend({
  bio: z.string().max(160, 'Bio must be at most 160 characters').optional(),
  avatarUrl: z.string().url('Invalid avatar URL').optional(),
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
