import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import formSlice from '../../app/forms/slice';

import {PostsApiPrisma} from './posts/Post';
import {FormApi} from './form/form';
export const store = configureStore({
  reducer: {
    [PostsApiPrisma.reducerPath]: PostsApiPrisma.reducer,
    [FormApi.reducerPath]: FormApi.reducer,
    form: formSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      PostsApiPrisma.middleware,
      FormApi.middleware,
    ),
});

setupListeners(store.dispatch);
