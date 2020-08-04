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
        <div className='flex justify-center m-8'>
          <div className='flex flex-col items-center rounded border-t border-b border-l border-gray-400 p-4 flex-grow'>
            <span className='text-gray-900 font-bold text-xl mb-4'>{data.actor.name}</span>
            <span className='mb-2'>{data.actor.birthYear}</span>
            <span>
              {data.actor.actorBio}
            </span>
          </div>
          <img src={data.actor.profilePhoto} alt='film-cover-img' className='h-128 w-128 rounded' />
        </div>
      )}
    </>
  );
};
export default Actor;
