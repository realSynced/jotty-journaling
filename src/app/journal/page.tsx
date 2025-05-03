import { createClient } from "@/utils/supabase/server";
import JournalClient from "@/app/journal/client/page";

export default async function Journal() {
  const supabase = await createClient(); // Initialize Supabase client
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return <div>Error fetching user information.</div>; // Handle error gracefully
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id!)
    .single();
  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return <div>Error fetching profile information.</div>; // Handle error gracefully
  }

  return <JournalClient username={profileData.username} />; // Render the client component with Supabase client
}
