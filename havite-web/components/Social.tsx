import { useAuth } from "@/lib/hooks/useAuth";
import { useRecapVote } from "@/lib/hooks/useRecapVote";
import { SquareArrowDown, SquareArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";

// Map categories to icons

type RecapCardProps = {
  recapId: string;
};

function Social({ recapId }: RecapCardProps) {
  const { user } = useAuth();

  const { upVotes, downVotes, userVote, toggleUpvote, toggleDownvote } =
    useRecapVote(recapId, user?.id);

  const router = useRouter();

  const goLogin = () => {
    router.push("/login");
  };

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      goLogin();
    }
    if (!recapId) {
      console.error("Recap ID is missing");
      return;
    }
    toggleUpvote();
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      goLogin();
    }
    if (!recapId) {
      console.error("Recap ID is missing");
      return;
    }
    toggleDownvote();
  };

  return (
    <div className="flex flex-row items-center gap-4 mt-2">
      <Button
        onClick={handleUpvote}
        type="button"
        size="small"
        variant={userVote === 1 ? "primary" : "transparent"}
      >
        <SquareArrowUp size={16} />
        <span className="text-sm ml-1">{upVotes}</span>
      </Button>
      <Button
        onClick={handleDownvote}
        type="button"
        size="small"
        variant={userVote === -1 ? "primary" : "transparent"}
      >
        <SquareArrowDown size={16} />
        <span className="text-sm ml-1">{downVotes}</span>
      </Button>
    </div>
  );
}

export default Social;
