import { WinnerToSend } from "./Winners";
import { validateResponse } from "./validateResponse";

export const updateUserOnServer = (user: WinnerToSend) => {
  return fetch(`http://localhost:3000/users/winners`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(validateResponse)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error updating:", error);
    });
};
