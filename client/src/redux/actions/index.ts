import actionTypes from "./actionTypes";
export const set_reset = (isReset: {}) => {
  return {
    type: actionTypes.SET_RESET,
    payload: { ...isReset },
  };
};
