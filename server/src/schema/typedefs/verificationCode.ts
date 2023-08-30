import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const VerificationCodeType = new GraphQLObjectType({
  name: "VerificationCode",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    code: { type: GraphQLString },
  }),
});

// export default VerificationCodeType;
