import gql from 'graphql-tag';

const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    register(input: { name: $name, email: $email, password: $password })
  }
`;
export default REGISTER_USER;
