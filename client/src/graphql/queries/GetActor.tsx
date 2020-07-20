import gql from 'graphql-tag';

const GET_ACTOR_QUERY = gql`
  query GetActor($id: Int!) {
    actor(id: $id) {
      id
      name
      birthYear
      profilePhoto
    }
  }
`;
export default GET_ACTOR_QUERY;
