import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  jwt: {
    maxAge: 4 * 60 * 60, // 4 hours
  },
  callbacks: {
    async signIn(user, account, profile) {
      if (user?.user?.email === process.env.AUTHOR_EMAIL) {
        return true
      }
      return false
    },
  },
})
