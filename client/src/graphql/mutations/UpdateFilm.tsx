import gql from 'graphql-tag';

const UPDATE_FILM = gql`
  mutation UpdateFilm(
    $name: String
    $year: Int
    $filmDirector: String
    $filmDescription: String
    $averageRating: Float
    $coverImage: Upload
    $filmCategories: [Int!]
    $filmActors: [Int!]
    $id: Int!
  ) {
    updateFilm(
      input: {
        name: $name
        year: $year
        filmDirector: $filmDirector
        filmDescription: $filmDescription
        averageRating: $averageRating
        coverImage: $coverImage
      }
      filmCategories: $filmCategories
      filmActors: $filmActors
      id: $id
    )
    {
      id
      name
      createdAt
    }
  }
`;
export default UPDATE_FILM;
