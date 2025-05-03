"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { updateProfile, insertUserDataPoints } from "@/backend/lib/api/profile";
import { initializeQuotas } from "@/backend/lib/api/quotas";
import { checkUserExists } from "@/backend/lib/auth/user";

export async function login(
  formData?: FormData,
  email?: string,
  password?: string
) {
  // If formData is provided, use it; otherwise, use the email and password parameters
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: (formData?.get("email") as string) || (email as string),
    password: (formData?.get("password") as string) || (password as string),
  };

  const userExists = await checkUserExists(data.email);
  if (!userExists) {
    console.error("User does not exist:", data.email);
    return "DNE"; // User does not exist
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.code === "invalid_credentials") {
      return "Invalid email or password. Please try again.";
    }
    console.error("Login failed:", error);
    return error.message || "Login failed. Please try again.";
    // redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/journal");
}

export async function signup(
  formData?: FormData,
  email?: string,
  password?: string,
  username?: string,
  interests?: string,
  goals?: string
) {
  console.log("Signup called with:", {
    email,
    password,
    username,
    interests,
    goals,
  });
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: (formData?.get("email") as string) || (email as string),
    password: (formData?.get("password") as string) || (password as string),
  };

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }
  console.log("User signed up:", user);
  if (!user) {
    console.error("No user found after signup");
  }

  await updateProfile(user?.id!, { username });
  await insertUserDataPoints(user?.id!, interests || "", goals || "");
  initializeQuotas(user?.id!, {});

  revalidatePath("/", "layout");
  redirect("/journal");
}
