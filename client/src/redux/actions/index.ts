import actionTypes from "./actionTypes";
export const setReset = (isReset: Boolean) => {
  return {
    type: actionTypes.SET_RESET,
    payload: isReset,
  };
};

export const setEmail = (email: String) => {
  return {
    type: actionTypes.SET_EMAIL,
    payload: email,
  };
};

export const setCode = (code: String) => {
  return {
    type: actionTypes.SET_CODE,
    payload: code,
  };
};

export const setTimeoutId = (timeoutId: {}) => {
  return {
    type: actionTypes.SET_TIMEOUT_ID,
    payload: timeoutId,
  };
};
