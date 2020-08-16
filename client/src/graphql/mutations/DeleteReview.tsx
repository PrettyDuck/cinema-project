import gql from 'graphql-tag';

const DELETE_REVIEW = gql`
  mutation DeleteReview($id: Int!) {
    deleteReview(id: $id)
  }
`;
export default DELETE_REVIEW;
