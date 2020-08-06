import gql from 'graphql-tag';

const GET_FILM_QUERY = gql`
  query GetFilm($id: Int!) {
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
      }
    }
  }
`;
export default GET_FILM_QUERY;
