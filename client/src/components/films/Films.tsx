import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GET_FILMS_QUERY from '../../graphql/queries/GetFilms';
import FilmItem from './FilmItem';

const Films:React.FC = () => {
  const { data, loading, error } = useQuery(GET_FILMS_QUERY);
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!loading && data.films && (
        <div className='grid gap-2 grid-cols-4 mx-24 my-12'>
          {data.films.map((film: FilmType) => (
            <FilmItem film={film} key={film.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Films;
