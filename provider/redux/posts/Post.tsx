import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const PostsApiPrisma = createApi({
  reducerPath: 'PostsApiPrisma',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (userId) => {
        if (!userId) {
          return {url: '', method: 'GET'};
        }
        return {url: `/api/prisma?userId=${userId}`, method: 'GET'};
      },
    }),
    addPost: builder.mutation({
      query: (obj) => ({
        url: '/api/prisma',
        method: 'POST',
        body: obj,
      }),
    }),
    deletePost: builder.mutation({
      query: (_id) => ({
        url: '/api/prisma',
        method: 'DELETE',
        body: {_id},
      }),
    }),

    updatePost: builder.mutation({
      query: (updatedPost) => ({
        url: '/api/prisma',
        method: 'PUT',
        body: updatedPost,
      }),
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = PostsApiPrisma;
