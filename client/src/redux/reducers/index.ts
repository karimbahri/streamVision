import { combineReducers } from "redux";
import isResetReducer from "./isResetReducer";
import emailReducer from "./emailReducer";
import codeReducer from "./codeReducer";
import timeoutIdReducer from "./timeoutIdReducer";

const reducers = combineReducers({
  isReset: isResetReducer,
  email: emailReducer,
  code: codeReducer,
  timeoutId: timeoutIdReducer,
});

export default reducers;
