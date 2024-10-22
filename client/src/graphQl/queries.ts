import gql from "graphql-tag";

export const GET_LATEST_ALL = gql`
  query getLatestAll {
    getLatestAll {
      id
      title
      thumbnail
    }
  }
`;

export const GET_LATEST_MOVIES_BY_CATEGORY = gql`
  query getLatestMoviesByCategory($category: String!, $size: Int!) {
    getLatestMoviesByCategory(category: $category, size: $size) {
      id
      title
      thumbnail
    }
  }
`;

export const GET_SPECIFIC_MOVIE = gql`
  query getSpecificMovie($thumbnail: String!) {
    getSpecificMovie(thumbnail: $thumbnail) {
      title
      content
      episodes
      seasons
    }
  }
`;

export const GET_SEARCHED_MOVIES = gql`
  query getSearchedMovies($searchTerm: String!, $size: Int!) {
    getSearchedMovies(searchTerm: $searchTerm, size: $size) {
      title
      thumbnail
    }
  }
`;
