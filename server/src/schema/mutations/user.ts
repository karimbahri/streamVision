import { GraphQLBoolean, GraphQLID, GraphQLString } from "graphql";
import UserType from "../typedefs/user";
import { Users, VerificationCode } from "../../entities";
import { RequestStatus } from "../typedefs/requestStatus";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {
  checkValidEmail,
  checkValidFullName,
  checkValidUserName,
  checkValidPassword,
  checkValidBirthday,
  generateId,
} from "../../utils";

export const CREATE_USER = {
  type: UserType,
  args: {
    fullName: { type: GraphQLString },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    passwordConfirmation: { type: GraphQLString },
    birthday: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
  },
  async resolve(parent: any, args: any) {
    let {
      fullName,
      userName,
      email,
      password,
      passwordConfirmation,
      birthday,
      isAdmin,
    } = args;

    /* Checking items */

    if (!checkValidEmail(email)) throw new Error("Unvalid email !");
    if (!checkValidFullName(fullName))
      throw new Error(
        "Unvalid FullName! \nPlease use the following format : firstname (middlename) lastname"
      );
    if (!checkValidUserName(userName)) throw new Error("Unvalid userName !");
    if (!checkValidPassword(password))
      throw new Error(
        "Password must be at least 8 characters and contains uppercase, lowercase, digits and special characters !"
      );
    if (password != passwordConfirmation)
      throw new Error("Password must match with passwordConfirmation !");

    if (!checkValidBirthday(birthday)) throw new Error("Unvalid birthday !");

    const user = await Users.findOne({
      where: [{ email: email }, { userName: userName }],
    });
    if (user) throw new Error("User already registered !");

    isAdmin = !isAdmin ? false : true;

    const hashed_password = await bcrypt.hash(password, 10);
    await Users.insert({
      fullName,
      userName,
      email,
      password: hashed_password,
      birthday,
      isAdmin,
    });
    return args;
  },
};

export const LOGIN = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { email, password } = args;
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      throw new Error("User doesn't exist !");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Wrong password !");

    return jwt.sign(
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.userName,
      },
      process.env.ACCESS_TOKEN_SECRET || "secret_key",
      { expiresIn: "1d" }
    );
  },
};

export const DELETE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    await Users.delete(id);
  },
};

export const UPDATE_USER_PASSWORD = {
  type: UserType,
  args: {
    userName: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { userName, oldPassword, newPassword } = args;

    const user = await Users.findOne({ where: { userName: userName } });
    if (!user) throw new Error("USER DOESN'T EXIST !");
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    if (passwordMatch) {
      return await Users.update({ userName }, { password: hashedNewPassword });
    } else {
      throw new Error("Password doesn't match");
    }
  },
};

export const UPDATE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
    userName: { type: GraphQLString },
    fullName: { type: GraphQLString },
    email: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
    birthday: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const {
      id,
      userName,
      fullName,
      email,
      oldPassword,
      newPassword,
      birthday,
    } = args;

    const updated_usr: {
      userName?: string;
      fullName?: string;
      email?: string;
      password?: string;
      birthday?: string;
    } = {};

    if (userName) updated_usr.userName = userName;
    if (fullName) updated_usr.fullName = fullName;
    if (email) updated_usr.email = email;
    if (birthday) updated_usr.birthday = birthday;

    const user = await Users.findOne({ where: { id: id } });

    if (!user) throw new Error("USER DOESN'T EXIST !");

    if (oldPassword && newPassword) {
      if (oldPassword === newPassword)
        throw new Error("PLEASE CHOOSE ANOTHER PASSWORD !");
      const passwordMatch = await bcrypt.compare(oldPassword, user.password);

      if (passwordMatch)
        updated_usr.password = await bcrypt.hash(newPassword, 10);
      else throw new Error("Password doesn't match");
    }
    if (Object.keys(updated_usr).length)
      return await Users.update({ id }, updated_usr);

    throw new Error("NO ITEM SELECTED !");
  },
};

export const RESET_USER = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { email } = args;

    const user = await Users.findOne({ where: { email: email } });
    if (!user) throw new Error("USER DOESN'T EXIST !");

    const verifCode = generateId();

    await VerificationCode.delete({ email });
    await VerificationCode.insert({ email, code: verifCode });

    const client = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    client.sendMail(
      {
        from: "noreply@steamvision.app",
        to: email,
        subject: "Password reset verification code",
        html: `<p>Your verification code is <strong>${verifCode}</strong></p>`,
      },
      function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      }
    );
  },
};
