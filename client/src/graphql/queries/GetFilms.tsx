import gql from 'graphql-tag';

const GET_FILMS_QUERY = gql`
  query GetFilms {
    films {
      id
      name
      year
      filmDescription
      averageRating
      coverImage
      categories {
        id
        name
      }
    }
  }
`;
export default GET_FILMS_QUERY;
