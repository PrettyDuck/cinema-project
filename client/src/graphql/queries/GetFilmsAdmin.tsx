import gql from 'graphql-tag';

const GET_FILMS_ADMIN_QUERY = gql`
  query GetFilms {
    films {
      id
      name
      year
      filmDescription
      averageRating
      coverImage
    }
  }
`;
export default GET_FILMS_ADMIN_QUERY;
