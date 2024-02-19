import {PrismaAdapter} from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';

import {prisma} from '../prisma/index';

interface User {
  id?: number;
}

interface Token {
  id?: number;
}

interface Session {
  user: User;
}
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {label: 'Email', type: 'text', placeholder: 'jsmith'},
        password: {label: 'Password', type: 'password'},
        username: {label: 'Username', type: 'text', placeholder: 'John Smith'},
      },
      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if no user was found
        if (!user || !user?.hashedPassword) {
          throw new Error('No user found');
        }

        // check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        // if password does not match
        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({token, user}: {token: Token; user: User}): Promise<Token> => {
      if (user) {
        return {...token, id: user?.id};
      }
      return token;
    },
    session: async ({
      session,
      token,
    }: {
      session: Session;
      token: Token;
    }): Promise<Session> => ({
      ...session,
      user: {
        ...session.user,
        id: token?.id,
      },
    }),
  },
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
};
