import React from 'react';
import starLogo from '../../res/star.svg';
import { Link } from 'react-router-dom';

const FilmItem = ({ film }) => {
  return (
    <Link to={`films/${film.id}`}>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <img className='w-full h-100' src={film.coverImage} alt='film-cover-img' />
        <div className='px-6 py-2'>
          <span className='font-bold text-xl'>{film.name}</span>
          <div className='flex flex-row items-center'>
            <img src={starLogo} alt='star-img' className='h-4 w-4' />
            <p className='text-gray-700 text-base px-1'>{film.averageRating}</p>
          </div>
        </div>
        <div className='px-6 pb-4'>
          {film.category.map((element) => (
            <span
              key={element.id}
              className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              {element.categoryName}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default FilmItem;
