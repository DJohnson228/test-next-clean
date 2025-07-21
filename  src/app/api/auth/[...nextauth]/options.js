import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google"; // Uncomment if needed

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace with your real DB lookup
        if (
          credentials.email === "demo@pellucid.health" &&
          credentials.password === "demo"
        ) {
          return { id: "1", email: "demo@pellucid.health", name: "Demo User" };
        }
        // Add DB lookup here if needed
        return null;
      }
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // })
  ],
  pages: {
    signIn: "/login" // Custom login page (optional)
  },
  session: { strategy: "jwt" } // Recommended for Next.js 13+
};

