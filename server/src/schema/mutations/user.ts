import { GraphQLID, GraphQLString } from "graphql";
import UserType from "../typedefs/user";
import { Users } from "../../entities";
import { RequestStatus } from "../typedefs/requestStatus";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const CREATE_USER = {
  type: UserType,
  args: {
    fullName: { type: GraphQLString },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    birthday: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    let { fullName, userName, email, password, birthday } = args;

    const hashed_password = await bcrypt.hash(password, 10);
    await Users.insert({
      fullName,
      userName,
      email,
      password: hashed_password,
      birthday,
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
      throw new Error("User doesn't exist");
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
