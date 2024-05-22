import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const WinnerSchema = z.object({
  username: z.string(),
  id: z.string(),
  balance: z.number(),
  date: z.number(),
  amount: z.union([z.number(), z.literal("JACKPOT")]),
});

export const WinnersArraySchema = z.array(WinnerSchema);

export type Winner = z.infer<typeof WinnerSchema>;
export type WinnerToSend = Omit<Winner, "date">;

export function fetchWinners(): Promise<Winner[]> {
  return fetch("http://localhost:3000/users/winners")
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => WinnersArraySchema.parse(data));
}
