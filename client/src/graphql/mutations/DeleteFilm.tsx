import gql from 'graphql-tag';

const DELETE_FILM = gql`
  mutation DeleteFilm($id: Int!) {
    deleteFilm(id: $id)
  }
`;
export default DELETE_FILM;
