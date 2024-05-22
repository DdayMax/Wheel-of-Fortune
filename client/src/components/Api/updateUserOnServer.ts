import { WinnerToSend } from "./Winners";
// import { queryClient } from "./queryClient";
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
    .then((data) => {
      console.log("User updated:", data);
      // queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    })
    .catch((error) => {
      console.error("Error updating:", error);
    });
};
