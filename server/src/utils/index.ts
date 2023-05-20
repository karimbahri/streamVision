export const generateId = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};
