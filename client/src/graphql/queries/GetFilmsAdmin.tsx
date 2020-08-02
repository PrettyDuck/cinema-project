import gql from 'graphql-tag';

const GET_FILMS_ADMIN_QUERY = gql`
  query GetFilmsAdmin($page: Int) {
    adminFilms(page: $page) {
      id
      name
      createdAt
    }
  }
`;
export default GET_FILMS_ADMIN_QUERY;
