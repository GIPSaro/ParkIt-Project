import { REGISTER_USER } from "../actions/registerAdnPurchaseAction";

const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
         hasAnnualCard: action.payload.annualCard,
      };
    default:
      return state;
  }
};

export default reducer;