"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { updateProfile, insertUserDataPoints } from "@/backend/lib/api/profile";

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

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
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

  revalidatePath("/", "layout");
  redirect("/journal");
}
