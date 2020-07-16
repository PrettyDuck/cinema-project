import gql from 'graphql-tag';

const GET_FILM_QUERY = gql`
  query GetFilm($id: Int!) {
    film(id: $id) {
      id
      name
      categoriesId
      year
      filmDescription
      averageRating
      coverImage
      actors {
        id
        name
        birthYear
        profilePhoto
      }
    }
  }
`;
export default GET_FILM_QUERY;
