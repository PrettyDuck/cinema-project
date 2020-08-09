type Action = { type: 'GET_REVIEWS'; payload: [] };

function reviewReducer(state: any, action: Action): any {
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
export default reviewReducer;
