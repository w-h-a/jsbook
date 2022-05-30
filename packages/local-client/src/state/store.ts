import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk, persistMiddleware],
  preloadedState: {},
});
