import gql from 'graphql-tag';

const ADD_NEW_FILM_REVIEW = gql`
  mutation AddNewFilmReview(
    $filmId: Int!
    $reviewPoints: Int!
    $reviewOwnerName: String!
    $reviewText: String!
  ) {
    addReview(
      filmId: $filmId
      reviewPoints: $reviewPoints
      reviewOwnerName: $reviewOwnerName
      reviewText: $reviewText
    ) {
      id
      reviewOwnerName
      reviewPoints
      reviewText
    }
  }
`;
export default ADD_NEW_FILM_REVIEW;
