import gql from 'graphql-tag';

const ADD_FILM_CATEGORY = gql`
  mutation AddFilmCategory($categoryId: Int!, $filmId: Int!) {
    addFilmCategory(categoryId: $categoryId, filmId: $filmId)
  }
`;
export default ADD_FILM_CATEGORY;
