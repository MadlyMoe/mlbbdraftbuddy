import React from "react";
import { signIn } from "@/auth";
import { register } from "@/lib/user";

const page = () => {
  return (
    <div>
      <h2>Sign in</h2>
       <form
        action={async () => {
          "use server"
          await signIn()
        }}
        >
          <button type="submit">Signin</button>
        </form>
      <h2>Register</h2>
      <form action={register}>
        <label>
          Username:
          <input name="username" type="text" required />
        </label>
        <label>
          Email:
          <input name="email" type="email" required />
        </label>

        <button type="submit">Register</button>

      </form>
    </div>
  );
}

export default page;