import React, { useEffect, useState } from 'react';
import AdminFilmItem from '../films/AdminFilmItem';
import { useLazyQuery } from '@apollo/react-hooks';
import GET_FILMS_ADMIN_QUERY from '../../graphql/queries/GetFilmsAdmin';

const AdminHome: React.FC = () => {
  const [films, setFilms] = useState([]);

  const [adminFilms] = useLazyQuery(GET_FILMS_ADMIN_QUERY, {
    onCompleted: (data) => {
      console.log(data);
      setFilms(data.adminFilms);
    },
  });
  useEffect(() => {
    adminFilms();
  }, []);

  return (
    <>
      {films && (
        <div className='m-4 border-t border-gray-600'>
          {films.map((film: AdminFilmItemType) => (
            <AdminFilmItem film={film} key={film.id} />
          ))}
        </div>
      )}
    </>
  );
};
export default AdminHome;
