import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(input: { email: $email, password: $password })
  }
`;
export default LOGIN_USER;
