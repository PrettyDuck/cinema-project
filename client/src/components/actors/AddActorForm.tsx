import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import GET_FILMS_ADMIN_QUERY from '../../graphql/queries/GetFilmsAdmin';
import ADD_ACTOR from '../../graphql/mutations/AddActor';

const AddActorForm: React.FC = () => {
  const { refetch } = useQuery(GET_FILMS_ADMIN_QUERY);

  const [birthYear, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [actorBio, setActorBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(new File([], 'name'));

  const [addActor] = useMutation(ADD_ACTOR);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeActorBio = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setActorBio(e.target.value);
  const onChangeProfilePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePhoto(e.target.files![0]);
  };

  const onChangeBirthYear = (date: any) => {
    setDate(date);
  };

  const history = useHistory();
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await addActor({
        variables: {
          name: name,
          birthYear: birthYear.getFullYear(),
          actorBio: actorBio,
          profilePhoto: profilePhoto,
        },
      });
      console.log(res);
      await refetch();
      return history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center my-24'>
      <div className='flex flex-col justify-center items-center w-1/2 rounded-lg shadow-2xl'>
        <div className='text-gray-700 text-lg pt-8'>Add Actor</div>
        <form className='w-full flex flex-col' onSubmit={onSubmit}>
          <div className='my-2 mx-6'>
            <label htmlFor='name'>Actor Name:</label>
            <br />
            <input
              type='text'
              name='name'
              className='border border-gray-400 w-full h-10 rounded-md px-2 outline-none focus:shadow-inner focus:bg-teal-100'
              placeholder='For example: Benedict Cumberbatch'
              value={name}
              onChange={onChangeName}
              required
            />
          </div>
          <div className='my-2 mx-6'>
            <label htmlFor='name'>Birth Year:</label>
            <br />
            <DatePicker
              selected={birthYear}
              onChange={onChangeBirthYear}
              className='outline-none'
            />
          </div>
          <div className='my-2 mx-6'>
            <label htmlFor='actorBio'>Actor Biography:</label>
            <br />
            <textarea
              name='actorBio'
              value={actorBio}
              onChange={onChangeActorBio}
              className='border border-gray-400 w-full h-32 rounded-md px-2 outline-none focus:shadow-inner focus:bg-teal-100 resize-none'
              placeholder='For example: Benedict Timothy Carlton Cumberbatch CBE (born 19 July 1976) is an English actor. A graduate of the Victoria University of Manchester, he continued his training at the London Academy of Music and Dramatic Art, obtaining a Master of Arts in Classical Acting.'
              style={{ fontSize: '18px' }}
              required></textarea>
          </div>
          <div className='my-2 mx-6'>
            <label htmlFor='name'>Add Actor Photo:</label>
            <br />
            <input type='file' name='profilePhoto' onChange={onChangeProfilePhoto} required />
          </div>
          <input
            type='submit'
            value='Add Actor'
            className='cursor-pointer uppercase border-none rounded-lg px-8 py-2 mb-4 self-center bg-teal-500 hover:bg-teal-600'
          />
        </form>
      </div>
    </div>
  );
};

export default AddActorForm;
