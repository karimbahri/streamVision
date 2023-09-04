import { combineReducers } from "redux";
import isResetReducer from "./isResetReducer";
import emailReducer from "./emailReducer";
import codeReducer from "./codeReducer";

const reducers = combineReducers({
  isReset: isResetReducer,
  email: emailReducer,
  code: codeReducer,
});

export default reducers;
