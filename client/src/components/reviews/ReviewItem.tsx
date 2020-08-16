import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/react-hooks';
import DELETE_REVIEW from '../../graphql/mutations/DeleteReview';
import GET_FILM_REVIEWS from '../../graphql/queries/GetFilmReviews';

const ReviewItem: React.FC<{ review: ReviewType; user: any }> = ({ review, user }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const deleteItem = async (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    try {
      await deleteReview({
        variables: {
          id: review.id,
        },

        update: (store, { data }) => {
          if (!data) {
            return null;
          }
          const { reviews }: any = store.readQuery({
            query: GET_FILM_REVIEWS,
            variables: { filmId: review.filmId },
          });
          store.writeQuery({
            query: GET_FILM_REVIEWS,
            variables: { filmId: review.filmId },
            data: {
              reviews: reviews.filter((r: ReviewType) => r.id !== review.id),
            },
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-1/2 bg-teal-600 p-4 mx-auto my-16 shadow-2xl rounded-lg flex flex-col items-center justify-center'>
      <h2 className=' text-gray-900 text-3xl font-semibold text-center truncate w-11/12'>
        {review.ownerName}
      </h2>
      <StarRatingComponent name='rating' starCount={10} value={review.ratingPoint} />

      <span className='mt-2 text-white text-center px-16 truncate w-full'>{review.reviewText}</span>
      {user !== null && user.id === review.userId ? (
        <FontAwesomeIcon className='cursor-pointer' icon={faTrash} onClick={deleteItem} />
      ) : null}
    </div>
  );
};
export default ReviewItem;
