import gql from 'graphql-tag';

const GET_FILMS_QUERY = gql`
  query GetFilms($limit: Int!, $cursor: String) {
    films(limit: $limit, cursor: $cursor) {
      filmsData
      {
      id
      name
      averageRating
      coverImage
      categories {
        id
        name
      }
      createdAt
    }
    hasMore
    }
  }
`;
export default GET_FILMS_QUERY;
