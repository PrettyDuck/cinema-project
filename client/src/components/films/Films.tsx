import React, { useState, useEffect } from 'react';
import FilmItem from './FilmItem';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import GET_FILMS_QUERY from '../../graphql/queries/GetFilms';
import GET_FILMS_SEARCH_QUERY from '../../graphql/queries/GetFilmsSearch';
import { Waypoint } from 'react-waypoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useApolloClient } from '@apollo/react-hooks'

const Films: React.FC = () => {
  const client = useApolloClient();

  const { data, loading, error, fetchMore } = useQuery(GET_FILMS_QUERY, {
    variables: {
      limit: 12,
    },
    onCompleted: (d) => {
      setFilms(d.films.filmsData);
    },
  });

  const [films, setFilms] = useState<FilmItemType[]>();
  const [searchedFilms, setSearchedFilms] = useState<FilmItemType[]>();
  const [searchText, setSearchText] = useState('');

  const [searchFilms] = useLazyQuery(GET_FILMS_SEARCH_QUERY, {
    onCompleted: (d) => {
      setFilms(d.films.filmsData);
      setSearchedFilms(d.films.filmsData);
    },
  });
  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value === '' && searchedFilms !== undefined) {
      setSearchedFilms(undefined);
      const { data: refechedData } = await client.query({
        query: GET_FILMS_QUERY,
        variables: {
          limit: 12,
        },
      });
      setFilms(refechedData.films.filmsData);
    }
  };
  const performSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (searchText !== '') {
      searchFilms({ variables: { searchText: searchText } });
    }
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {films !== undefined && (
        <>
          <div className=' container mx-auto px-4 pt-8'>
            <div className='bg-white flex items-center rounded-md shadow-2xl'>
              <input
                className='w-full py-4 px-6 text-gray-700 focus:outline-none'
                type='search'
                placeholder='Search Film By Name...'
                onChange={onChangeSearch}
              />
              <div className='p-4'>
                <button
                  className='bg-teal-600 text-white rounded-full p-2 hover:bg-teal-500 focus:outline-none w-12 h-12 flex items-center justify-center'
                  onClick={performSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
          <div className='grid gap-2 grid-cols-4 mx-24 my-12'>
            {films.map((film: FilmItemType, index: number) => (
              <React.Fragment key={index}>
                <FilmItem film={film} key={film.id} />

                {/* Infinine scroll block */}
                {searchedFilms === undefined && index === data.films.filmsData.length - 1 && (
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
                            const res: {
                              films: {
                                filmsData: FilmItemType[];
                                hasMore: boolean;
                                __typename: string;
                              };
                            } = {
                              films: {
                                filmsData: [
                                  ...previousVal.films.filmsData,
                                  ...fetchMoreResult.films.filmsData,
                                ],
                                hasMore: fetchMoreResult.films.hasMore,
                                __typename: 'GetFilmsResponseType',
                              },
                            };
                            setFilms(res.films.filmsData);
                            return res;
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
        </>
      )}
    </>
  );
};

export default Films;
