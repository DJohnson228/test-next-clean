import { useSession, signIn, signOut } from "next-auth/react";

export default function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <button onClick={() => signIn()}>Sign in</button>;

  return (
    <div>
      <p>Welcome, {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
