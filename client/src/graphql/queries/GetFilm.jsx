import gql from 'graphql-tag';

const GET_FILM_QUERY = gql`
  query GetFilm($id: Int!) {
    film(id: $id) {
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
export default GET_FILM_QUERY;
