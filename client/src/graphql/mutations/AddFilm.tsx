import gql from 'graphql-tag';

const ADD_FILM = gql`
  mutation AddFilm(
    $name: String!
    $year: Int!
    $filmDirector: String!
    $filmDescription: String!
    $averageRating: Float!
    $coverImage: Upload!
  ) {
    addFilm(
      input: {
        name: $name
        year: $year
        filmDirector: $filmDirector
        filmDescription: $filmDescription
        averageRating: $averageRating
        coverImage: $coverImage
      }
    ) {
      id
      name
      year
      filmDirector
      filmDescription
      averageRating
      coverImage
    }
  }
`;
export default ADD_FILM;
