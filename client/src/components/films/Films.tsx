import React from 'react';
import FilmItem from './FilmItem';
import { useQuery } from '@apollo/react-hooks';
import GET_FILMS_QUERY from '../../graphql/queries/GetFilms';
import { Waypoint } from 'react-waypoint';

const Films: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_FILMS_QUERY, {
    variables: {
      limit: 12
    },
  });
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {!loading && data.films.filmsData && (
        <div className='grid gap-2 grid-cols-4 mx-24 my-12'>
          {data.films.filmsData.map((film: FilmItemType, index: number) => (
            <React.Fragment key={index}>
              <FilmItem film={film} key={film.id} />
              {index === data.films.filmsData.length - 1 && (
                <Waypoint
                  onEnter={() => {
                    if (data.films.hasMore) {
                      fetchMore({
                        variables: {
                          limit: 4,
                          cursor: data.films.filmsData[data.films.filmsData.length - 1].createdAt,
                        },
                        updateQuery: (previousVal: any, { fetchMoreResult }: any) => {
                          if (!fetchMoreResult) {
                            return previousVal;
                          }
                          return {
                            films: {
                              filmsData: [
                                ...previousVal.films.filmsData,
                                ...fetchMoreResult.films.filmsData,
                              ],
                              hasMore: fetchMoreResult.films.hasMore,
                              __typename: 'GetFilmsResponseType',
                            },
                          };
                        },
                      });
                      console.log(index);
                    }
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default Films;
