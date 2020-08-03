import gql from 'graphql-tag';

const GET_FILMS_SEARCH_QUERY = gql`
  query GetFilmsSearch($searchText: String) {
    films(filter: $searchText) {
      filmsData {
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
    }
  }
`;
export default GET_FILMS_SEARCH_QUERY;
