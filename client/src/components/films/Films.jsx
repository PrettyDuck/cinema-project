import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GET_ALL_FILMS_QUERY from '../../graphql/queries/GetAllFilms.jsx';
import FilmItem from './FilmItem.jsx';

const Films = () => {
  const { data, loading } = useQuery(GET_ALL_FILMS_QUERY);
  return (
    <>
      {loading && <div>Loading...</div>}

      {!loading && data.films && (
        <div className='px-32 py-4'>
          <div className='grid gap-4 grid-cols-4'>
            {data.films.map((film) => (
                <FilmItem film={film} key={film.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Films;
