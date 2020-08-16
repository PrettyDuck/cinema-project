import gql from 'graphql-tag';

const GET_FILM_REVIEWS = gql`
  query GetFilmReviews($filmId: Int!) {
    reviews(filmId: $filmId) {
      id
      filmId
      userId
      ownerName
      ratingPoint
      reviewText
      userId
    }
  }
`;
export default GET_FILM_REVIEWS;
