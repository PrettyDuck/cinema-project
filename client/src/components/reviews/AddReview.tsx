import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { useMutation } from '@apollo/react-hooks';
import ADD_NEW_FILM_REVIEW from '../../graphql/mutations/AddFilmReview';
import GET_FILM_REVIEWS from '../../graphql/queries/GetFilmReviews';
import { useApolloClient } from '@apollo/react-hooks';
import GET_CURRENT_USER_QUERY from '../../graphql/queries/GetCurrentUser';

const AddReview: React.FC<{ targetFilmId: string }> = ({ targetFilmId }) => {
  // Manually update the cache after mutation
  const client = useApolloClient();
  const [addReview] = useMutation(ADD_NEW_FILM_REVIEW, {
    update(cache, { data: { addReview } }) {
      const { reviews }: any = cache.readQuery({
        query: GET_FILM_REVIEWS,
        variables: { filmId: parseInt(targetFilmId) },
      });
      cache.writeQuery({
        query: GET_FILM_REVIEWS,
        variables: { filmId: parseInt(targetFilmId) },
        data: { reviews: [addReview, ...reviews] },
      });
    },
  });
  const [review, setReview] = useState({
    ratingPoint: 0,
    reviewText: '',
  });

  const { ratingPoint, reviewText } = review;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const changeRating = (nextValue: any, prevValue: any, name: any) => {
    setReview({
      ...review,
      ratingPoint: nextValue,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reviewText === '') {
      console.log('All fields needs to be filled');
    } else {
      addReview({
        variables: {
          filmId: parseInt(targetFilmId),
          userId: client.readQuery({ query: GET_CURRENT_USER_QUERY }).getCurrentUser.id,
          ratingPoint: ratingPoint,
          ownerName: client.readQuery({ query: GET_CURRENT_USER_QUERY }).getCurrentUser.name,
          reviewText: reviewText,
        },
      });

      setReview({
        ratingPoint: 0,
        reviewText: '',
      });
    }
  };
  return (
    <>
      <form className='max-w-xl rounded-lg mt-16 mb-8 px-4 shadow-lg mx-auto' onSubmit={onSubmit}>
        <div className='flex flex-wrap'>
          <h2 className='px-4 py-2 text-gray-800 text-lg'>Post your own review</h2>
          <div className='w-full px-3 my-2'>
            <StarRatingComponent
              name='rating'
              starCount={10}
              value={ratingPoint}
              onStarClick={changeRating}
            />
          </div>
          <div className='w-full px-3 my-2'>
            <textarea
              className='bg-gray-100 rounded border leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
              name='reviewText'
              placeholder='Review Text'
              onChange={onChange}
              value={reviewText}></textarea>
          </div>
          <div className='w-full flex items-start p-3'>
            <input
              type='submit'
              className='bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide hover:bg-gray-100 focus:outline-none'
              value='Post Review'
            />
          </div>
        </div>
      </form>
    </>
  );
};
export default AddReview;
