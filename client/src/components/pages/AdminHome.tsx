import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GET_FILMS_ADMIN_QUERY from '../../graphql/queries/GetFilmsAdmin';
import AdminFilmItem from '../films/AdminFilmItem' 

const AdminHome: React.FC = () => {
  const { data, loading, error } = useQuery(GET_FILMS_ADMIN_QUERY);
 
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!loading && data.films && (
        <div className="m-4 border-t border-gray-600">
          {data.films.map((film: FilmType) => (
            <AdminFilmItem film={film} key={film.id}/>
          ))}
        </div>
      )}
    </>
  );
};
export default AdminHome;
