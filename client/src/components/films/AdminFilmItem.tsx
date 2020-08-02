import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import GET_FILMS_ADMIN_QUERY from '../../graphql/queries/GetFilmsAdmin';
import DELETE_FILM from '../../graphql/mutations/DeleteFilm';

const AdminFilmItem: React.FC<{ film: AdminFilmItemType }> = ({ film }) => {
  const { refetch } = useQuery(GET_FILMS_ADMIN_QUERY);

  const [deleteFilm] = useMutation(DELETE_FILM);

  const deleteItem = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await deleteFilm({
        variables: {
          id: film.id,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const history = useHistory();
  const updateItem = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push('/filmUpdate', { filmId: film.id });
  };
  return (
    <div
      className='p-4 border-b border-r border-l  border-gray-600 flex items-center justify-between'
      key={film.id}>
      <span>
        {film.id}. {film.name}
      </span>
      <div className='flex-grow flex justify-end'>
        <button
          className='block uppercase mx-2 shadow bg-red-700 hover:bg-red-600 focus:outline-none text-white text-xs py-3 px-10 rounded order-2'
          onClick={deleteItem}>
          Delete Film
        </button>
        <button
          className='block uppercase mx-2 shadow bg-green-700 hover:bg-green-600 focus:outline-none text-white text-xs py-3 px-10 rounded'
          onClick={updateItem}>
          Update Film
        </button>
      </div>
    </div>
  );
};
export default AdminFilmItem;
