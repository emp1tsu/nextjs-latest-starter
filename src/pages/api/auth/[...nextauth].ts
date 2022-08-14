import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { assertIsDefined } from '@/helpers/assert'

const prisma = new PrismaClient()

assertIsDefined(process.env.GOOGLE_CLIENT_ID)
assertIsDefined(process.env.GOOGLE_CLIENT_SECRET)

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      })
    },
  },
}

export default NextAuth(authOptions)
