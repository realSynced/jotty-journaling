import { createServiceRoleClient } from "@/utils/supabase/service_role";

export async function checkUserExists(email: string) {
  try {
    const supabase = createServiceRoleClient();

    // Check if the user exists by querying the auth.users table
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
      console.error("Error listing users:", error);
      return false; // Assume user does not exist on error
    }

    const user = data.users.find((user) => user.email === email);
    if (!user) {
      console.log("User does not exist:", email);
      return false; // User does not exist
    }

    return user !== undefined; // Return true if user exists, false otherwise
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false; // Assume user does not exist on error
  }
}
