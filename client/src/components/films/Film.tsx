import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import GET_FILM_QUERY from '../../graphql/queries/GetFilm';
import Reviews from '../reviews/Reviews';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import DELETE_FILM from '../../graphql/mutations/DeleteFilm';

const Film: React.FC = ({ match }: any) => {
  const { data, loading, error } = useQuery(GET_FILM_QUERY, {
    variables: {
      id: parseInt(match.params.id),
    },
  });

  const [deleteFilm] = useMutation(DELETE_FILM);

  const history = useHistory();
  const deleteItem = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await deleteFilm({
        variables: {
          id: parseInt(match.params.id),
        },
      });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  const updateItem = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push('/filmUpdate')
  }
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!loading && data.film && (
        <div className='flex flex-col'>
          <div className='flex justify-center m-8'>
            <div className='flex flex-col items-center rounded border-t border-b border-l border-gray-400 p-4 flex-grow'>
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
              <div className=' flex flex-row items-center justify-between my-2 w-full'>
                <button
                  className='block uppercase mx-auto shadow bg-red-700 hover:bg-red-600 focus:outline-none text-white text-xs py-3 px-10 rounded'
                  onClick={deleteItem}>
                  Delete Film
                </button>
                <button className='block uppercase mx-auto shadow bg-green-700 hover:bg-green-600 focus:outline-none text-white text-xs py-3 px-10 rounded' onClick={updateItem}>
                  Update Film
                </button>
              </div>
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
