import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GET_FILM_QUERY from '../../graphql/queries/GetFilm.jsx';
import StarRatingComponent from 'react-star-rating-component';

const Film = ({ match }) => {
  const { data, loading, error } = useQuery(GET_FILM_QUERY, {
    variables: {
      id: parseInt(match.params.id),
    },
  });
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!loading && data.film && (
        <div className='flex flex-col'>
          <div className='flex justify-center py-8 px-2'>
            <div class='flex flex-col items-center rounded border-t border-b border-l border-gray-400 p-4'>
              <span class='text-gray-900 font-bold text-xl mb-2'>{data.film.name}</span>
              <span className='mb-2'>{data.film.year}</span>
              <span className='mb-2'>User Rating: {data.film.averageRating}/10</span>
              <span className='bg-white leading-normal'>{data.film.filmDescription}</span>
            </div>
            <img src={data.film.coverImage} alt='film-cover-img' className='h-128 w-128 rounded' />
          </div>
          <div className='flex items-center justify-center shadow-lg mt-4 mx-16 mb-4 max-w-lg'>
            <form className='w-full max-w-xl bg-white rounded-lg px-4 pt-2'>
              <div className='flex flex-wrap -mx-3 mb-6'>
                <h2 className='px-4 pt-3 pb-2 text-gray-800 text-lg'>Post your own review</h2>
                <div className='w-full md:w-full px-3 mb-2 mt-2'>
                  <input
                    type='text'
                    required
                    placeholder='Type your Name'
                    className='bg-gray-100 rounded border leading-normal w-full h-10 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
                  />
                </div>
                <StarRatingComponent className="px-3" starCount={10} name='rating' />
                <div className='w-full md:w-full px-3 mb-2 mt-2'>
                  <textarea
                    className='bg-gray-100 rounded border leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
                    name='body'
                    placeholder='Review Text'></textarea>
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
        </div>
      )}
    </>
  );
};

export default Film;
