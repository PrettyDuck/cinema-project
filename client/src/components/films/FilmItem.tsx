import React from 'react';
import { Link } from 'react-router-dom';
import starLogo from '../../res/star.svg';

const FilmItem: React.FC<{ film: FilmItemType }> = ({ film }) => {
  return (
    <>
      <Link to={`films/${film.id}`}>
        <div className='rounded shadow-lg '>
          <img className='w-full h-80' src={film.coverImage} alt='film-cover-img' />
          <div className='px-6 py-2'>
            <p className='font-bold text-xl max-w-xs truncate h-8'>{film.name}</p>
            <div className='flex flex-row items-center'>
              <img src={starLogo} alt='star-img' className='h-4 w-4' />
              <p className='text-gray-700 text-base px-1'>{film.averageRating}</p>
            </div>
          </div>
          <div className='px-6 pb-4 h-12 overflow-hidden'>
            {film.categories.map(
              (category: CategoryType, i) =>
                i < 3 && (
                  <span
                    key={category.id}
                    className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                    {category.name}
                  </span>
                ),
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default FilmItem;
