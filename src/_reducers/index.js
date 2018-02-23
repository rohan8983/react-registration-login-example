import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { registerDirectory } from './registerDirectory.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  registerDirectory,
});

export default rootReducer;