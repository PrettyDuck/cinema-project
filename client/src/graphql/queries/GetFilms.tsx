import gql from 'graphql-tag';

const GET_FILMS_QUERY = gql`
  query GetFilms {
    films {
      id
      name
      categoriesId
      year
      filmDescription
      averageRating
      coverImage
    }
  }
`;
export default GET_FILMS_QUERY;
