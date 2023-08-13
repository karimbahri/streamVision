export const generateId = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

export const checkValidEmail = (email: string) => {
  if (!/^[a-z0-9._-]{2,15}@[a-z0-9]{2,15}\.[a-z]{2,10}$/g.test(email))
    return false;
  return true;
};
