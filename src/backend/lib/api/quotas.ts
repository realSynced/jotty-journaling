import { createClient } from "@/utils/supabase/server";

export async function getQuotas(userId: string) {
  try {
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
  } catch (error) {
    console.error("Error fetching quotas:", error);
    throw error;
  }
}

export async function initializeQuotas(userId: string, quotaData: any) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("quotas")
      .insert({ user_id: userId, ...quotaData });

    if (error) {
      console.error("Error inserting quota:", error);
      throw new Error("Failed to insert quota");
    }
  } catch (error) {
    console.error("Error inserting quota:", error);
    throw new Error("Failed to insert quota");
  }
}

export async function reducePromptsLeft(userId: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("quotas")
      .select("prompts_left")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching quotas:", error);
      throw new Error("Failed to fetch quotas");
    }
    if (data.prompts_left <= 0) {
      throw new Error("No prompts left for today");
    }
    const newPromptsLeft = data.prompts_left - 1;

    await updateQuotas(userId, { prompts_left: newPromptsLeft });
  } catch (error) {
    console.error("Error reducing prompts left:", error);
    throw error;
  }
}

export async function updateQuotas(userId: string, quotaData: any) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("quotas")
      .update(quotaData)
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating quotas:", error);
      throw new Error("Failed to update quotas");
    }
  } catch (error) {
    console.error("Error updating quotas:", error);
    throw error;
  }
}
