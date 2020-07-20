import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GET_FILM_QUERY from '../../graphql/queries/GetFilm';
import Reviews from '../reviews/Reviews';
import { Link } from 'react-router-dom';

const Film: React.FC = ({ match }: any) => {
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
          <div className='flex justify-center m-8'>
            <div className='flex flex-col items-center rounded border-t border-b border-l border-gray-400 p-4'>
              <span className='text-gray-900 font-bold text-xl mb-4'>{data.film.name}</span>
              <span className='mb-2'>{data.film.year}</span>
              <span className='mb-2'>User Rating: {data.film.averageRating}/10</span>
              {data.film.actors.length === 0 ? null : (
                <div className='mb-2 flex flex-col items-center justify-center'>
                  <span>Stars:</span>
                  <ul>
                    {data.film.actors.map((actor: ActorType) => (
                      <li key={actor.id}>
                        <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <span className='bg-white leading-normal'>{data.film.filmDescription}</span>
            </div>
            <img src={data.film.coverImage} alt='film-cover-img' className='h-128 w-128 rounded' />
          </div>
          <Reviews targetFilmId={match.params.id} />
        </div>
      )}
    </>
  );
};

export default Film;
