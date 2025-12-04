import { supabase } from "@/lib/supabase";
import { User } from "@/types";

export async function saveUserToSupabase(user: User, userId: string) {
  const { error } = await supabase.from("users").upsert({
    id: userId,
    email: user.email,
    full_name: user.name,
    avatar_url: user.avatarUrl || null,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error saving user to Supabase:", error);
  }
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    return null;
  }
  return data;
}
