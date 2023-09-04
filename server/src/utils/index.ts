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

export const checkValidPassword = (password: string) => {
  if (
    !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/g.test(
      password
    )
  )
    return false;
  return true;
};

export const checkValidBirthday = (birthday: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/g.test(birthday)) return false;
  const date = Number(birthday.slice(8));
  const month = Number(birthday.slice(5, 7));
  const year = Number(birthday.slice(0, 4));

  if (date < 1 || date > 31) return false;
  if (month < 1 || month > 12) return false;
  if (year < 1900 || year > Number(new Date().getFullYear())) return false;
  return true;
};

/* ======================================================================= */

export const removeExpiredAuth = (
  VerificationCode: { delete: any; findOne: any },
  email: string,
  code: string,
  time: number
) =>
  new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve(async () => {
        const verif_code = await VerificationCode.findOne({
          where: { code: code, email: email },
        });
        if (verif_code) await VerificationCode.delete({ email });
      });
    }, time * 1000);
  });
