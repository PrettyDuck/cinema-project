import gql from 'graphql-tag';

const GET_FILM_ADMIN_QUERY = gql`
  query GetFilmAdmin($id: Int!) {
    film(id: $id) {
      id
      name
      year
      filmDescription
      filmDirector
      averageRating
      coverImage
      actors {
        id
        name
        birthYear
        profilePhoto
      }
      categories {
        id
        name
      }
    }
  }
`;
export default GET_FILM_ADMIN_QUERY;
