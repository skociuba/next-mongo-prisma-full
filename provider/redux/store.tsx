import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

import {PostsApiPrisma} from './posts/Post';

export const store = configureStore({
  reducer: {
    [PostsApiPrisma.reducerPath]: PostsApiPrisma.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PostsApiPrisma.middleware),
});

setupListeners(store.dispatch);
