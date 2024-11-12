import { z } from "zod";

const todoValidator = z.object({
  title: z.string(),
  description: z.string(),
});

export default todoValidator;
