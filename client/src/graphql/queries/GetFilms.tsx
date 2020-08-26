import gql from 'graphql-tag';

const GET_FILMS_QUERY = gql`
  query GetFilms(
    $limit: Int!
    $cursor: String
    $searchText: String
    $categoryFilter: Int
    $yearFilter: Int
  ) {
    films(
      limit: $limit
      cursor: $cursor
      nameSearch: $searchText
      categoryFilter: $categoryFilter
      yearFilter: $yearFilter
    ) {
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
      hasMore
    }
  }
`;
export default GET_FILMS_QUERY;
