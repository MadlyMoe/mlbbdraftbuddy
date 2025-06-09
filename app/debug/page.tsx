import { auth } from "@/auth";
import { getDrafts } from "@/lib/draft";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h6>Drafts:</h6>
      <pre>{JSON.stringify(await getDrafts(session?.user?.id), null, 2)}</pre>
    </div>
  );
}
