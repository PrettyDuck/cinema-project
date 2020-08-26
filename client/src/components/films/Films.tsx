import React, { useState } from 'react';
import FilmItem from './FilmItem';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import GET_FILMS_QUERY from '../../graphql/queries/GetFilms';
import { Waypoint } from 'react-waypoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useApolloClient } from '@apollo/react-hooks';

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
  const [categoryFilter, setCategoryFilter] = useState(0);
  const [yearFilter, setYearFilter] = useState(0);

  const [searchFilms] = useLazyQuery(GET_FILMS_QUERY, {
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
  const onChangeCategorySelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(parseInt(e.target.value));
    searchFilms({
      variables: {
        limit: 12,
        searchText: searchText,
        categoryFilter: parseInt(e.target.value),
        yearFilter: yearFilter,
      },
    });
  };
  const onChangeYearSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYearFilter(parseInt(e.target.value));
    searchFilms({
      variables: {
        limit: 12,
        searchText: searchText,
        categoryFilter: categoryFilter,
        yearFilter: parseInt(e.target.value),
      },
    });
  };

  const performSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (searchText !== '') {
      searchFilms({
        variables: {
          limit: 12,
          searchText: searchText,
          categoryFilter: categoryFilter,
          yearFilter: yearFilter,
        },
      });
    }
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {films !== undefined && (
        <>
          <div className='container mx-auto px-4 pt-8'>
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
            <div className='flex'>
              <div className='w-2/4 rounded-md mx-1 my-2'>
                <select
                  className='w-full h-10 border-2 rounded-md outline-none border-teal-600'
                  onChange={onChangeCategorySelect}
                  value={categoryFilter}>
                  <option value='0'>Select Category</option>
                  <option value='1'>Action</option>
                  <option value='2'>Comedy</option>
                  <option value='3'>Drama</option>
                  <option value='4'>Horror</option>
                  <option value='5'>Thriller</option>
                  <option value='6'>Science Fiction</option>
                  <option value='7'>Fantasy</option>
                  <option value='8'>Adventure</option>
                  <option value='9'>Animation</option>
                  <option value='10'>Crime</option>
                </select>
              </div>
              <div className='w-2/4 rounded-md mx-1 my-2 '>
                <select
                  className='w-full h-10 border-2 rounded-md outline-none border-teal-600'
                  onChange={onChangeYearSelect}
                  value={yearFilter}>
                  <option value='0'>Choose Release Decade</option>
                  <option value='2020'>2020&apos;s</option>
                  <option value='2010'>2010&apos;s</option>
                  <option value='2000'>2000&apos;s</option>
                  <option value='1990'>1990&apos;s</option>
                  <option value='1980'>1980&apos;s</option>
                  <option value='1970'>1970&apos;s</option>
                  <option value='1960'>1960&apos;s</option>
                  <option value='1950'>1950&apos;s</option>
                  <option value='1940'>1940&apos;s</option>
                </select>
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
