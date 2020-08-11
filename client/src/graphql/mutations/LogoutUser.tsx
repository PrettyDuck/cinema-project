import gql from 'graphql-tag';

const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout
  }
`;
export default LOGOUT_USER;
