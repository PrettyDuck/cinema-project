import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const ReviewItem: React.FC<{ review: ReviewType }> = ({ review }) => {
  return (
    <div className='w-1/2 bg-teal-600 p-4 mx-auto my-16 shadow-2xl rounded-lg flex flex-col items-center justify-center'>
      <h2 className=' text-gray-900 text-3xl font-semibold text-center truncate w-11/12'>
        {review.ownerName}
      </h2>
      <StarRatingComponent name='rating' starCount={10} value={review.ratingPoint} />
      <span className='mt-2 text-white text-center px-16 truncate w-full'>{review.reviewText}</span>
    </div>
  );
};
export default ReviewItem;
