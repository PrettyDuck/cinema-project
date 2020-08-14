import gql from 'graphql-tag';

const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      email
      role
    }
  }
`;
export default GET_CURRENT_USER_QUERY;
