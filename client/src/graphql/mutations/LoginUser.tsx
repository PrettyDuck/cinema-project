import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      accessToken
      user {
        id
        name
        email
      }
    }
  }
`;
export default LOGIN_USER;
