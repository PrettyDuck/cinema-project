import gql from 'graphql-tag';


const ADD_ACTOR = gql`
  mutation AddActor($name: String!, $birthYear: Int!, $profilePhoto: Upload!) {
    addActor(input: { name: $name, birthYear: $birthYear, profilePhoto: $profilePhoto }) {
      id
      name
      birthYear
      profilePhoto
    }
  }
`;
export default ADD_ACTOR;