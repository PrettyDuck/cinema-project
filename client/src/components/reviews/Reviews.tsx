import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import GET_FILM_REVIEWS from '../../graphql/queries/GetFilmReviews';
import ReviewItem from './ReviewItem';
import AddRewiew from './AddReview';
import reviewContext from '../../reviewContext';

const Reviews = ({ targetFilmId }) => {
  const { state, dispatch } = useContext(reviewContext);

  const { data, loading, error } = useQuery(GET_FILM_REVIEWS, {
    variables: {
      filmId: parseInt(targetFilmId),
    },
  });

  useEffect(() => {
    if (data && data.reviews) {
      dispatch({ type: 'GET_REVIEWS', payload: data.reviews });
    }
  }, [data]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!loading && data.reviews && state && (
        <div className='flex items-start justify-around'>
          <div>
            <h2 className='text-gray-800 text-3xl font-semibold text-center'>User reviews</h2>
            {state.reviews.length === 0 && (
              <h4 className='text-2xl font-semibold text-center'>
                There is no any user review yet.
              </h4>
            )}
            {state.reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
          <AddRewiew targetFilmId={targetFilmId} />
        </div>
      )}
    </>
  );
};
export default Reviews;
