import gql from 'graphql-tag';

const GET_ALL_FILMS_QUERY = gql`
  query GetAllFilms {
    films {
      id
      name
      categoryId
      category {
        id
        categoryName
      }
      year
      filmDescription
      averageRating
      coverImage
    }
  }
`;
export default GET_ALL_FILMS_QUERY;
