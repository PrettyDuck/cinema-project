import gql from 'graphql-tag';

const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;
export default GET_CATEGORIES_QUERY;
