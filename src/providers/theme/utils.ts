export const setCSSVariable = (key: string, value: string) => {
  document.body.style.setProperty(`--${key}`, value);
};
