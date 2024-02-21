import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import formSlice from '../../app/form/slice';

import {PostsApiPrisma} from './posts/Post';
export const store = configureStore({
  reducer: {
    [PostsApiPrisma.reducerPath]: PostsApiPrisma.reducer,
    form: formSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PostsApiPrisma.middleware),
});

setupListeners(store.dispatch);
