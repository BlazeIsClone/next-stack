import { z } from "zod";

export const Health = z.object({
  key: z.string(),
  value: z.string(),
});
