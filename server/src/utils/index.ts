export const generateId = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

export const checkValidEmail = (email: string) => {
  if (!/^[a-z0-9._-]{2,15}@[a-z0-9]{2,15}\.[a-z]{2,10}$/g.test(email))
    return false;
  return true;
};

export const checkValidUserName = (userName: string) => {
  if (!/^[a-zA-Z]{1}[a-zA-Z0-9_-]{2,15}$/g.test(userName)) return false;
  return true;
};

export const checkValidFullName = (fullName: string) => {
  if (!/^[a-zA-Z]{2,12}[ ][a-zA-Z\s*]{2,20}$/g.test(fullName)) return false;
  return true;
};
