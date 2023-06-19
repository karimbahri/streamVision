// import ApolloClient from "apollo-boost";
import { ApolloClient, InMemoryCache } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "http://localhost:3000/graphql",
//   request: (operation) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       operation.setContext({
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });
//     }
//   },
//   onError: ({ graphQLErrors, networkError }) => {
//     if (graphQLErrors) {
//       graphQLErrors.forEach(({ message, locations, path }) =>
//         console.log(
//           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//         )
//       );
//     }
//     if (networkError) {
//       console.log(`[Network error]: ${networkError}`);
//     }
//   },
// });

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

export default client;
