import { combineReducers } from "redux";
import company from './companyReducer';

const rootReducer = combineReducers({
  company,
});

export default rootReducer;
