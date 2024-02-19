import NextAuth, {AuthOptions, SessionStrategy} from 'next-auth';

import {authOptions} from '../../../../lib/authOptions';

const handler = NextAuth({
  ...authOptions,
  session: {
    ...authOptions.session,
    expires: '7 days', // Add the required expires property
  },
} as unknown as AuthOptions & {
  session: {strategy: SessionStrategy | undefined};
});
export {handler as GET, handler as POST};
