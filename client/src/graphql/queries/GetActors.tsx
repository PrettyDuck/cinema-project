import gql from 'graphql-tag';

const GET_ACTORS_QUERY = gql`
  query GetActors {
    actors {
      id
      name
      birthYear
      profilePhoto
    }
  }
`;
export default GET_ACTORS_QUERY;
