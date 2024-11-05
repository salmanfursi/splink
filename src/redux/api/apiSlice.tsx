import { createApi, fetchBaseQuery, RootState } from '@reduxjs/toolkit/query/react';
import { checkTokenAndLogout } from './checkTokenAndLogout';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.0.112:5000',
    prepareHeaders: (headers, { getState }) => {
      // Get token from auth state
      const token = (getState() as RootState).auth.token;

      // Check token validity, and if invalid, handle logout
      const isValid = checkTokenAndLogout(token);
      if (token && isValid) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default apiSlice;
