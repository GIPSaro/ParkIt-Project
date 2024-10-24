
import { SET_ANNUAL_CARD } from "../actions/cardAction";

const initialState = {
    annualCard: null,
};

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ANNUAL_CARD:
            return {
                ...state,
                annualCard: action.payload,
            };
        default:
            return state;
    }
};

export default cardReducer;
