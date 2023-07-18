// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import menu from './menu';
import snackbar from './snackbar';
import authUserReducer from './authUser';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar,
  authUser: persistReducer(
    {
      key: 'authUser',
      storage
    },
    authUserReducer
  )
});

export default reducers;
