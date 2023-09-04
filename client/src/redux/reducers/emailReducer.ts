import actions from "../actions/actionTypes";

export default function emailReducer(
  state = "",
  action: { payload: any; type: any }
) {
  switch (action.type) {
    case actions.SET_EMAIL:
      return action.payload;
    default:
      return state;
  }
}
