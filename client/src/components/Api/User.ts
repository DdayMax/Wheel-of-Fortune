import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const UserSchema = z.object({
  username: z.string(),
  id: z.string(),
  balance: z.number(),
});

export type IUser = z.infer<typeof UserSchema>;

export function fetchMe(): Promise<IUser> {
  return fetch("http://localhost:3000/users/me")
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => UserSchema.parse(data));
}
