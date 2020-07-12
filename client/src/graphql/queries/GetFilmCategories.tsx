import gql from 'graphql-tag';

const GET_FILM_CATEGORIES = gql`
  query GetFilmCategories($filmCategoriesId: String!) {
    filmCategories(filmCategoriesId: $filmCategoriesId) {
      id
      name
    }
  }
`;
export default GET_FILM_CATEGORIES;
