import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const ReviewItem = ({ review }) => {
  return (
    <div className='max-w-md py-4 px-16 bg-white shadow-lg rounded-lg my-4 flex flex-col items-center'>
      <h2 className='text-gray-800 text-3xl font-semibold text-center'>{review.ownerName}</h2>
      <StarRatingComponent name='rating' starCount={10} value={review.ratingPoint} />
      <p className='mt-2 text-gray-600 px-16'>{review.reviewText}</p>
    </div>
  );
};
export default ReviewItem;
