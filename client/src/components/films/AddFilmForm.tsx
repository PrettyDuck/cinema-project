import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import GET_CATEGORIES_QUERY from '../../graphql/queries/GetCategories';
import GET_ACTORS_QUERY from '../../graphql/queries/GetActors';
import ADD_FILM from '../../graphql/mutations/AddFilm';
import ADD_FILM_ACTOR from '../../graphql/mutations/AddFilmActor';
import MultiSelect from 'react-multi-select-component';
import { useHistory } from 'react-router-dom';

interface SelectOption {
  label: string;
  value: number;
}

const AddFilmForm: React.FC = () => {
  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery(
    GET_CATEGORIES_QUERY,
  );
  const { data: actorsData, loading: actorsLoading, error: actorsError } = useQuery(
    GET_ACTORS_QUERY,
  );

  const categoriesOptions: any = [];
  const actorsOptions: any = [];
  useEffect(() => {
    if (!categoriesError && !categoriesLoading) {
      categoriesData.categories.map((category: CategoryType) =>
        categoriesOptions.push({ value: category.id, label: category.name }),
      );
      console.log(categoriesOptions);
    }
  }, [categoriesData, categoriesError, categoriesLoading, categoriesOptions]);

  useEffect(() => {
    if (!actorsError && !actorsLoading) {
      actorsData.actors.map((actor: ActorType) =>
        actorsOptions.push({ value: actor.id, label: actor.name }),
      );
      console.log(actorsOptions);
    }
  }, [actorsData, actorsError, actorsLoading, actorsOptions]);

  const [selectedCategories, setSelectedCategories] = useState<SelectOption[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<SelectOption[]>([]);

  const [name, setName] = useState('');
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const [year, setYear] = useState('');
  const onChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => setYear(e.target.value);

  const [filmDirector, setFilmDirector] = useState('');
  const onChangeFilmDirector = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilmDirector(e.target.value);

  const [filmDescription, setFilmDescription] = useState('');
  const onChangeFilmDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFilmDescription(e.target.value);

  const [averageRating, setAverageRating] = useState('');
  const onChangeAverageRating = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAverageRating(e.target.value);

  const [coverImage, setCoverImage] = useState(new File([], 'name'));
  const onChangeCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverImage(e.target.files![0]);
  };

  const history = useHistory();

  const [addFilm] = useMutation(ADD_FILM);
  const [addFilmActor] = useMutation(ADD_FILM_ACTOR);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const categoriesId: any = [];
      selectedCategories.map((category) => {
        categoriesId.push(category.value);
      });
      const res = await addFilm({
        variables: {
          name: name,
          categoriesId: categoriesId.join(','),
          year: parseInt(year),
          filmDirector: filmDirector,
          filmDescription: filmDescription,
          averageRating: parseFloat(averageRating),
          coverImage: coverImage,
        },
      });
      console.log(res);
      for await (let actor of selectedAuthors) {
        const actorRes = await addFilmActor({
          variables: {
            actorId: actor.value,
            filmId: res.data.addFilm.id,
          },
        });
        console.log(actorRes);
      }
      await history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {categoriesLoading && <div>Loading...</div>}
      {categoriesError && <div>{categoriesError.message}</div>}
      {!categoriesLoading && categoriesData.categories && (
        <div className='flex flex-col justify-center items-center my-12'>
          <div className='flex flex-col justify-center items-center w-1/2 rounded-lg shadow-2xl'>
            <div className='text-gray-700 text-lg pt-8'>Add New Film</div>
            <form className='w-full flex flex-col' onSubmit={onSubmit}>
              <div className='my-2 mx-6'>
                <label htmlFor='name'>Film Title:</label>
                <br />
                <input
                  type='text'
                  name='name'
                  value={name}
                  onChange={onChangeName}
                  className='border border-gray-400 w-full h-10 rounded-md px-2 outline-none focus:shadow-inner focus:bg-green-100'
                  placeholder='For example: The Shawshank Redemption'
                  required
                />
              </div>
              <div className='my-2 mx-6'>
                <label>Film Categories:</label>
                <br />
                <MultiSelect
                  options={categoriesOptions}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                  labelledBy={'SelectCategories'}
                  className='outline-none'
                />
              </div>
              <div className='my-2 mx-6'>
                <label htmlFor='year'>Year of release:</label>
                <br />
                <input
                  type='text'
                  name='year'
                  value={year}
                  onChange={onChangeYear}
                  className='border border-gray-400 w-full h-10 rounded-md px-2 outline-none focus:shadow-inner focus:bg-green-100'
                  pattern='[0-9]*'
                  placeholder='For example: 1990'
                  required
                />
              </div>
              <div className='my-2 mx-6'>
                <label htmlFor='filmDirector'>Film Director:</label>
                <br />
                <input
                  type='text'
                  name='filmDirector'
                  value={filmDirector}
                  onChange={onChangeFilmDirector}
                  className='border border-gray-400 w-full h-10 rounded-md px-2 outline-none focus:shadow-inner focus:bg-green-100'
                  placeholder='For example: Kventin Tarantino'
                  required
                />
              </div>
              <div className='my-2 mx-6'>
                <label htmlFor='filmDescription'>Film Description:</label>
                <br />
                <textarea
                  name='filmDescription'
                  value={filmDescription}
                  onChange={onChangeFilmDescription}
                  className='border border-gray-400 w-full h-20 rounded-md px-2 outline-none focus:shadow-inner focus:bg-green-100 resize-none'
                  placeholder='For example: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                  style={{ fontSize: '18px' }}></textarea>
              </div>
              <div className='my-2 mx-6'>
                <label htmlFor='averageRating'>Average Rating:</label>
                <input
                  type='text'
                  name='averageRating'
                  value={averageRating}
                  onChange={onChangeAverageRating}
                  className='border border-gray-400 w-full h-10 rounded-md px-2 outline-none focus:shadow-inner focus:bg-green-100'
                  placeholder='For example: 8.7'
                  pattern='[0-9\.]*'
                  required
                />
              </div>
              <div className='my-2 mx-6'>
                <label>Choose Stars:</label>
                <br />
                <MultiSelect
                  options={actorsOptions}
                  value={selectedAuthors}
                  onChange={setSelectedAuthors}
                  labelledBy={'SelectActors'}
                  className='outline-none'
                />
              </div>
              <div className='my-2 mx-6'>
                <label htmlFor='coverImage'>Add Film Cover Image:</label>
                <br />
                <input type='file' name='coverImage' onChange={onChangeCoverImage} required />
              </div>
              <input
                type='submit'
                value='Add Film'
                className='cursor-pointer uppercase border-none rounded-lg px-8 py-2 mb-4 self-center bg-green-300 hover:bg-green-500'
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default AddFilmForm;
