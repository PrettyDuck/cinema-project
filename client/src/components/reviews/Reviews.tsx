import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import ReviewItem from './ReviewItem';
import AddRewiew from './AddReview';
import GET_FILM_REVIEWS from '../../graphql/queries/GetFilmReviews';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import GET_CURRENT_USER_QUERY from '../../graphql/queries/GetCurrentUser';
import { useApolloClient } from '@apollo/react-hooks';
import 'swiper/swiper-bundle.css';

const Reviews: React.FC<{ targetFilmId: string }> = ({ targetFilmId }) => {
  SwiperCore.use([Pagination]);
  const client = useApolloClient();
  const [user, setUser]: any = useState({ getCurrentUser: null });
  const { data, loading, error } = useQuery(GET_FILM_REVIEWS, {
    variables: {
      filmId: parseInt(targetFilmId),
    },
    onCompleted: () => {
      try {
        setUser(client.readQuery({ query: GET_CURRENT_USER_QUERY }));
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!loading && data.reviews && (
        <>
          <h2 className='text-gray-800 text-3xl font-semibold text-center'>User reviews</h2>
          {data.reviews.length === 0 && (
            <h4 className='text-2xl font-semibold text-center'>There is no any user review yet.</h4>
          )}
          <Swiper spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }}>
            {data.reviews.map((review: ReviewType) => (
              <SwiperSlide key={review.id}>
                <ReviewItem key={review.id} review={review} user={user.getCurrentUser}/>
              </SwiperSlide>
            ))}
          </Swiper>
          {user.getCurrentUser !== null ? (
            <AddRewiew targetFilmId={targetFilmId} />
          ) : (
            <h3 className='text-2xl font-semibold text-center mb-8'>
              Please login if you want to write a review to this film
            </h3>
          )}
        </>
      )}
    </>
  );
};
export default Reviews;
