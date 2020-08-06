import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import ReviewItem from './ReviewItem';
import AddRewiew from './AddReview';
import reviewContext from '../../reviewContext';
import GET_FILM_REVIEWS from '../../graphql/queries/GetFilmReviews';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination} from 'swiper';
import 'swiper/swiper-bundle.css';

const Reviews: React.FC<{ targetFilmId: string }> = ({ targetFilmId }) => {
  SwiperCore.use([Pagination]);

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
        <>
          <h2 className='text-gray-800 text-3xl font-semibold text-center'>User reviews</h2>
          {state.reviews.length === 0 && (
            <h4 className='text-2xl font-semibold text-center'>There is no any user review yet.</h4>
          )}
          <Swiper spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }}>
            {state.reviews.map((review: ReviewType) => (
              <SwiperSlide key={review.id}>
                <ReviewItem key={review.id} review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
          <AddRewiew targetFilmId={targetFilmId} />
        </>
      )}
    </>
  );
};
export default Reviews;
