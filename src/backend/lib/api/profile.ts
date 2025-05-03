import { createClient } from "@/utils/supabase/server";
import { user } from "@heroui/theme";

export async function getProfile(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }

  return data;
}

export async function updateProfile(userId: string, profileData: any) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", userId);

  if (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
}

export async function insertUserDataPoints(
  userId: string,
  interests: string,
  goals: string
) {
  console.log("Inserting user data points:", { userId, interests, goals });
  const supabase = await createClient();

  const { error } = await supabase
    .from("user_data_points")
    .insert({ user_id: userId, interests: interests, goals: goals });

  if (error) {
    console.error("Error updating data points:", error);
    throw new Error("Failed to update data points");
  }
}
