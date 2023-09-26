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

export const GET_LATEST_MOVIES_BY_CATEGORY = gql`
  getLatestMoviesByCategory($category: String!) {
    getLatestMoviesByCategory(category: $category) {
      id
      title
      thumbnail
    }
  }
`;
