import actions from "../actions/actionTypes";

export default function isResetReducer(
  state = false,
  action: { payload: any; type: any }
) {
  switch (action.type) {
    case actions.SET_RESET:
      return action.payload;
    default:
      return state;
  }
}
