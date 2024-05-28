const base64chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/====";

export const getRandomChar = (equalSignProbability = 0.0) => {
  return equalSignProbability > Math.random()
    ? "="
    : base64chars[Math.floor(Math.random() * base64chars.length)];
};

export const stringToArr = (str: string) => {
  return str.split("");
};
