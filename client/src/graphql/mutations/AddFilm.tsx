import gql from 'graphql-tag';

const ADD_FILM = gql`
  mutation AddFilm(
    $name: String!
    $categoriesId: String!
    $year: Int!
    $filmDirector: String!
    $filmDescription: String!
    $averageRating: Float!
    $coverImage: Upload!
  ) {
    addFilm(
      input: {
        name: $name
        categoriesId: $categoriesId
        year: $year
        filmDirector: $filmDirector
        filmDescription: $filmDescription
        averageRating: $averageRating
        coverImage: $coverImage
      }
    ) {
      id
      name
      categoriesId
      year
      filmDirector
      filmDescription
      averageRating
      coverImage
    }
  }
`;
export default ADD_FILM;
