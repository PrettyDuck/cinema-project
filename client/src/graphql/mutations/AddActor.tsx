import gql from 'graphql-tag';

const ADD_ACTOR = gql`
  mutation AddActor($name: String!, $birthYear: Int!, $actorBio: String!, $profilePhoto: Upload!) {
    addActor(
      input: {
        name: $name
        birthYear: $birthYear
        actorBio: $actorBio
        profilePhoto: $profilePhoto
      }
    )
  }
`;
export default ADD_ACTOR;
