import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
//
export const SIGNUP_MUTATION = gql`
  mutation createUser(
    $userName: String!
    $password: String!
    $passwordConfirmation: String!
    $fullName: String!
    $email: String!
    $birthday: String!
  ) {
    createUser(
      userName: $userName
      password: $password
      passwordConfirmation: $passwordConfirmation
      fullName: $fullName
      email: $email
      birthday: $birthday
    ) {
      id
    }
  }
`;
//
export const RESET_USER = gql`
  mutation resetUser($email: String!) {
    resetUser(email: $email) {
      id
    }
  }
`;
//
export const RESET_PASSWORD = gql`
  mutation updateUserPassword(
    $email: String!
    $code: String!
    $newPassword: String!
    $oldPassword: String!
  ) {
    updateUserPassword(
      email: $email
      code: $code
      newPassword: $newPassword
      oldPassword: $oldPassword
    ) {
      id
    }
  }
`;

export const CHECK_VERIFICATION_CODE = gql`
  mutation chaeckVerificationUser($email: String!, $code: String!) {
    chaeckVerificationUser(email: $email, code: $code)
  }
`;
