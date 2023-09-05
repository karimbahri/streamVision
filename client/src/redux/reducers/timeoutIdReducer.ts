import actions from "../actions/actionTypes";

export default function timeoutIdReducer(
  state = {},
  action: { payload: any; type: any }
) {
  switch (action.type) {
    case actions.SET_TIMEOUT_ID:
      return action.payload;
    default:
      return { ...state };
  }
}
