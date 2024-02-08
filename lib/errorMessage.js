export const errorMessage = (message) => {
  const messageError = message.toString().split("Error: ")[1];

  if (messageError === "jwt expired") return null;

  return messageError;
};
