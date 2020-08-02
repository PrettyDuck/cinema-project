type Action = { type: 'GET_REVIEWS'; payload: [] };

export default function reviewReducer(state: any, action: Action) {
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
