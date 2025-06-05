import { redirect } from "next/navigation";
import { signIn } from "@/auth"; // your configured Auth.js instance
import { providerMap } from "@/auth.config";
import { AuthError } from "next-auth";

const SIGNIN_ERROR_URL = "/error";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      {Object.values(providerMap).map((provider) => (
        <form key={provider.id} action={signInAction}>
          <input type="hidden" name="providerId" value={provider.id} />
          <input
            type="hidden"
            name="callbackUrl"
            value={searchParams?.callbackUrl ?? "/"}
          />
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded-md"
          >
            Sign in with {provider.name}
          </button>
        </form>
      ))}
    </div>
  );
}

// Server Action for handling the sign-in
async function signInAction(formData: FormData) {
  "use server";

  const providerId = formData.get("providerId") as string;
  const callbackUrl = formData.get("callbackUrl") as string;

  try {
    await signIn(providerId, {
      redirectTo: callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
    }
    throw error;
  }
}
