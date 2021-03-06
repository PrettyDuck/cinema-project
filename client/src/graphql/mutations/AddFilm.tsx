import gql from 'graphql-tag';

const ADD_FILM = gql`
  mutation AddFilm(
    $name: String!
    $year: Int!
    $filmDirector: String!
    $filmDescription: String!
    $averageRating: Float!
    $coverImage: Upload!
    $filmCategories: [Int!]!
    $filmActors: [Int!]!
  ) {
    addFilm(
      input: {
        name: $name
        year: $year
        filmDirector: $filmDirector
        filmDescription: $filmDescription
        averageRating: $averageRating
        coverImage: $coverImage
        filmCategories: $filmCategories
        filmActors: $filmActors
      }
    )
    {
      id
      name
      createdAt
    }
  }
`;
export default ADD_FILM;
