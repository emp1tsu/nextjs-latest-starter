import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { assertIsDefined } from '@/helpers/assert'

const prisma = new PrismaClient()

assertIsDefined(process.env.GOOGLE_CLIENT_ID)
assertIsDefined(process.env.GOOGLE_CLIENT_SECRET)

export default NextAuth({
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
})
