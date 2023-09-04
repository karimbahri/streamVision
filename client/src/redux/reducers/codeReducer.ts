import actions from "../actions/actionTypes";

export default function codeReducer(
  state = "",
  action: { payload: any; type: any }
) {
  switch (action.type) {
    case actions.SET_CODE:
      return action.payload;
    default:
      return state;
  }
}
