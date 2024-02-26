import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectionStr } from '../../../lib/db';
import mooongose from 'mongoose';
import { Member } from '@/app/lib/model/userregistration';
import bcrypt from 'bcrypt';

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log('Profile GitHub===##: ', profile);

        let userRole = 'GitHub User';
        if (profile?.email == 'krishnendu.pal2000@gmail.com') {
          userRole = 'admin';
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await mooongose.connect(connectionStr);
        try {
          const user = await Member.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
