import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const FormApi = createApi({
  reducerPath: 'FormApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),

  endpoints: (builder) => ({
    getForms: builder.query({
      query: () => ({url: `/api/form`, method: 'GET'}),
    }),
    addForm: builder.mutation({
      query: (formData) => ({
        url: '/api/form',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {useGetFormsQuery, useAddFormMutation} = FormApi;
