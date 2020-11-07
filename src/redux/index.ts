import { combineReducers, createStore } from 'redux';
import companies from './companies/reducer';
import users from './users/reducer';
import messages from './messages/reducer';


const reducers = combineReducers({
  company: companies,
  user: users,
  message: messages
});

export const store = createStore(reducers);