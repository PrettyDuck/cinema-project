import React, { useState, useContext } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import ADD_NEW_FILM_REVIEW from '../../graphql/mutations/AddFilmReview';
import GET_FILM_REVIEWS from '../../graphql/queries/GetFilmReviews';
import { useMutation } from '@apollo/react-hooks';
import reviewContext from '../../reviewContext';

const AddReview:React.FC<{targetFilmId: string }> = ({ targetFilmId }) => {
  const { state, dispatch } = useContext(reviewContext);

  const [addReview] = useMutation(ADD_NEW_FILM_REVIEW, {
    update(cache, { data: { addReview } }) {
      const { reviews }:any = cache.readQuery({
        query: GET_FILM_REVIEWS,
        variables: { filmId: parseInt(targetFilmId) },
      });
      cache.writeQuery({
        query: GET_FILM_REVIEWS,
        data: { reviews: reviews.push(addReview) },
      });
      dispatch({
        type: 'GET_REVIEWS',
        payload: reviews,
      });
    },
  });
  const [review, setReview] = useState({
    ratingPoint: 0,
    ownerName: '',
    reviewText: '',
  });

  const { ratingPoint, ownerName, reviewText } = review;

  const onChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const changeRating = (nextValue:any, prevValue:any, name:any) => {
    setReview({
      ...review,
      ratingPoint: nextValue,
    });
  };

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ownerName === '' || reviewText === '') {
      console.log('All fields needs to be filled');
    } else {
      addReview({
        variables: {
          filmId: parseInt(targetFilmId),
          ratingPoint: ratingPoint,
          ownerName: ownerName,
          reviewText: reviewText,
        },
      });

      setReview({
        ratingPoint: 0,
        ownerName: '',
        reviewText: '',
      });
    }
  };
  return (
    <div className='flex items-center justify-center shadow-lg mb-4 max-w-lg'>
      <form className='w-full max-w-xl bg-white rounded-lg px-4 pt-2' onSubmit={onSubmit}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <h2 className='px-4 pt-3 pb-2 text-gray-800 text-lg'>Post your own review</h2>
          <div className='w-full md:w-full px-3 mb-2 mt-2'>
            <input
              type='text'
              required
              placeholder='Type your Name'
              name='ownerName'
              className='bg-gray-100 rounded border leading-normal w-full h-10 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
              onChange={onChange}
              value={ownerName}
            />
          </div>
          <StarRatingComponent
            className='px-3'
            name='rating'
            starCount={10}
            value={ratingPoint}
            onStarClick={changeRating}
          />
          <div className='w-full md:w-full px-3 mb-2 mt-2'>
            <textarea
              className='bg-gray-100 rounded border leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
              name='reviewText'
              placeholder='Review Text'
              onChange={onChange}
              value={reviewText}></textarea>
          </div>
          <div className='w-full  flex items-start px-3'>
            <div className='-mr-1'>
              <input
                type='submit'
                className='bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100'
                value='Post Review'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddReview;
