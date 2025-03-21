
import { z } from 'zod';

export const activityFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.date({
    required_error: "Date is required",
  }),
  time: z.string().min(1, "Time is required"),
  categoryId: z.string().min(1, "Category is required"),
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;
