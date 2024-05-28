const base64chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=====================================";

export const getRandomChar = () => {
  return base64chars[Math.floor(Math.random() * base64chars.length)];
};
