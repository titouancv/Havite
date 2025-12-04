import { supabase } from "@/lib/supabase";
import { Comment } from "@/types";

export async function fetchComments(recapId: string) {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
          *,
          user:users (
            id,
            email,
            full_name,
            avatar_url
          )
        `
    )
    .eq("recap_id", recapId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((comment: any) => ({
    id: comment.id,
    content: comment.content,
    userId: comment.user_id,
    recapId: comment.recap_id,
    parentId: comment.parent_id,
    createdAt: comment.created_at,
    user: comment.user
      ? {
          id: comment.user.id,
          email: comment.user.email,
          name: comment.user.full_name,
          avatarUrl: comment.user.avatar_url,
        }
      : undefined,
  })) as Comment[];
}

type AddCommentInput = {
  recapId: string;
  content: string;
  userId: string;
  parentId?: string;
};

export async function addComment({
  recapId,
  content,
  userId,
  parentId,
}: AddCommentInput): Promise<Comment> {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      recap_id: recapId,
      content,
      user_id: userId,
      parent_id: parentId ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
    throw new Error(error.message);
  }

  return data;
}
