import { GraphQLID, GraphQLString } from "graphql";
import UserType from "../typedefs/user";
import { Users } from "../../entities";
import { RequestStatus } from "../typedefs/requestStatus";

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
    try {
      let { fullName, userName, email, password, birthday } = args;
      await Users.insert({
        fullName,
        userName,
        email,
        password,
        birthday,
      });
      return args;
    } catch (err) {
      console.log("ERROR : ", err);
    }
  },
};

export const DELETE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    try {
      const { id } = args;
      await Users.delete(id);
    } catch (err) {
      console.log("ERROR : ", err);
    }
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
    try {
      const { userName, oldPassword, newPassword } = args;

      const user = await Users.findOne({ where: { userName: userName } });
      const userPassword = user?.password;
      if (oldPassword === userPassword) {
        return await Users.update({ userName }, { password: newPassword });
      } else {
        throw new Error("Password doesn't match");
      }
    } catch (err) {
      // console.log("ERROR : ", err);
      throw new Error(`ERROR : ${err}`);
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
    try {
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

      if (oldPassword && newPassword) {
        const userPassword = user?.password;
        if (oldPassword === userPassword) updated_usr.password = newPassword;
        else throw new Error("Password doesn't match");
      }
      if (Object.keys(updated_usr).length)
        return await Users.update({ id }, updated_usr);

      throw new Error("No item to update");
    } catch (err) {
      throw new Error(`ERROR : ${err}`);
      // console.log("ERROR: ", err);
    }
  },
};
