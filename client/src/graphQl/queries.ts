import gql from "graphql-tag";

export const GET_LATEST_MOVIES = gql`
  query getLatestMovies {
    getLatestMovies {
      id
      title
      thumbnail
    }
  }
`;
