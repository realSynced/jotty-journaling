import { createClient } from "@/utils/supabase/server";

export async function getQuotas(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quotas")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching quotas:", error);
    throw new Error("Failed to fetch quotas");
  }

  return data;
}

export async function intializeQuotas(userId: string, quotaData: any) {
  const supabase = await createClient();

  const { error } = await supabase.from("quotas").insert({ user_id: userId });

  if (error) {
    console.error("Error inserting quota:", error);
    throw new Error("Failed to insert quota");
  }
}
