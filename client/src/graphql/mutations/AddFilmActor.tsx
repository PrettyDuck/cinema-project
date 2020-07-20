import gql from 'graphql-tag';

const ADD_FILM_ACTOR = gql`
  mutation AddFilmActor($actorId: Int!, $filmId: Int!) {
    addFilmActor(actorId: $actorId, filmId: $filmId)
  }
`;
export default ADD_FILM_ACTOR;
