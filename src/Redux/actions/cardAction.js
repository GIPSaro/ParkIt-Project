
export const SET_ANNUAL_CARD = "SET_ANNUAL_CARD";

export const setAnnualCard = (cardDetails) => {
    return {
        type: SET_ANNUAL_CARD,
        payload: cardDetails,
    };
};
