import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export function useRecapVote(recapId: string, userId?: string) {
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const [userVote, setUserVote] = useState<0 | 1 | -1>(0);

  // --- Fetch initial state ---
  const loadVotes = async () => {
    if (!recapId) return;

    const { data, error } = await supabase
      .from("recap_votes")
      .select("*")
      .eq("recap_id", recapId);

    if (error) return console.error(error);

    setUpVotes(data.filter((v) => v.vote === 1).length);
    setDownVotes(data.filter((v) => v.vote === -1).length);

    if (userId) {
      const userVoteRow = data.find((v) => v.user_id === userId);
      setUserVote(userVoteRow ? userVoteRow.vote : 0);
    }
  };

  useEffect(() => {
    (async () => {
      await loadVotes();
    })();
  }, [recapId, userId]);

  // --- Realtime ---
  useEffect(() => {
    if (!recapId) return;

    const channel = supabase
      .channel(`recap_votes_${recapId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "recap_votes" },
        () => {
          loadVotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [recapId]);

  // --- Mutations ---
  const vote = async (value: 1 | -1) => {
    if (!userId || !recapId) return;

    // Optimistic update
    const prevUserVote = userVote;
    const prevUpVotes = upVotes;
    const prevDownVotes = downVotes;

    let newUserVote: 0 | 1 | -1 = value;
    if (prevUserVote === value) {
      newUserVote = 0;
    }

    setUserVote(newUserVote);

    if (newUserVote === 0) {
      if (prevUserVote === 1) setUpVotes((c) => Math.max(0, c - 1));
      if (prevUserVote === -1) setDownVotes((c) => Math.max(0, c - 1));
    } else {
      if (newUserVote === 1) {
        setUpVotes((c) => c + 1);
        if (prevUserVote === -1) setDownVotes((c) => Math.max(0, c - 1));
      } else {
        setDownVotes((c) => c + 1);
        if (prevUserVote === 1) setUpVotes((c) => Math.max(0, c - 1));
      }
    }

    try {
      const existing = await supabase
        .from("recap_votes")
        .select("vote")
        .eq("recap_id", recapId)
        .eq("user_id", userId)
        .maybeSingle();

      if (existing.data && existing.data.vote === value) {
        await supabase
          .from("recap_votes")
          .delete()
          .eq("recap_id", recapId)
          .eq("user_id", userId);
      } else {
        await supabase.from("recap_votes").upsert(
          {
            recap_id: recapId,
            user_id: userId,
            vote: value,
          },
          { onConflict: "recap_id,user_id" }
        );
      }
    } catch (error) {
      // Rollback
      setUserVote(prevUserVote);
      setUpVotes(prevUpVotes);
      setDownVotes(prevDownVotes);
    }
  };

  return {
    upVotes,
    downVotes,
    userVote,
    toggleUpvote: () => vote(1),
    toggleDownvote: () => vote(-1),
  };
}
