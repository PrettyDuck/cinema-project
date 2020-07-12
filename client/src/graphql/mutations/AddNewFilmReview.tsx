import gql from 'graphql-tag';

const ADD_FILM_REVIEW = gql`
  mutation AddFilmReview(
    $filmId: Int!
    $ownerName: String!
    $ratingPoint: Int!
    $reviewText: String!
  ) {
    addReview(
      filmId: $filmId
      input: {
      ownerName: $ownerName
      ratingPoint: $ratingPoint
      reviewText: $reviewText
      }
    ) {
      id
      ownerName
      ratingPoint
      reviewText
    }
  }
`;
export default ADD_FILM_REVIEW;
