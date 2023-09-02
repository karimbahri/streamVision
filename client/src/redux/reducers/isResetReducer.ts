import actions from "../actions/actionTypes";

export default function isResetReducer(
  state = { isReset: false },
  action: { payload: any; type: any }
) {
  switch (action.type) {
    case actions.SET_RESET:
      return { isReset: action.payload };
    default:
      return { ...state };
  }
}
