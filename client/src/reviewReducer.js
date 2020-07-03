export default function reviewReducer(state, action) {
  console.log(action);
  switch (action.type) {
    case 'GET_REVIEWS':
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
}
