import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GET_ACTOR_QUERY from '../../graphql/queries/GetActor';

const Actor: React.FC = ({ match }: any) => {
  const { data, loading, error } = useQuery(GET_ACTOR_QUERY, {
    variables: {
      id: parseInt(match.params.id),
    },
  });
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!loading && data.actor && (
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-center m-8 self-stretch'>
            <div className='flex flex-col items-center rounded border-t border-b border-l border-gray-400 p-4 flex-grow'>
              <span className='text-gray-900 font-bold text-xl mb-4'>{data.actor.name}</span>
              <span className='mb-2'>{data.actor.birthYear}</span>
              <span>{data.actor.actorBio}</span>
            </div>
            <img
              src={data.actor.profilePhoto}
              alt='film-cover-img'
              className='h-128 w-128 rounded'
            />
          </div>
          <div className='container'>
            <h4 className='text-2xl font-semibold text-center'>Filmography</h4>
            <table className='text-center w-full border border-b-0 my-4'>
              <thead className=' bg-teal-700 flex text-white'>
                <tr className='flex w-full'>
                  <th className='p-4 w-1/2'>Film</th>
                  <th className='p-4 w-1/2'>Release Year</th>
                </tr>
              </thead>
              <tbody className='bg-grey-light flex flex-col items-center w-full'>
                {data.actor.films.map((film: { id: number; name: string; year: number }) => (
                  <>
                    <tr className='flex w-full border-b '>
                      <td className='p-4 w-1/2'>{film.name}</td>
                      <td className='p-4 w-1/2'>{film.year}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
export default Actor;
