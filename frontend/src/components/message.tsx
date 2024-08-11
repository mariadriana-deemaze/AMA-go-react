import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { createMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string;
  text: string;
  amountOfReactions: number;
  answered?: boolean;
}

export function Message({
  roomId,
  message: { id, text, amountOfReactions, answered = false },
}: {
  roomId: string;
  message: MessageProps;
}) {
  const [hasReacted, setHasReacted] = useState(false);

  async function addReaction() {
    try {
      await createMessageReaction({ roomId, messageId: id });
      setHasReacted(true);
    } catch (error) {
      toast.error("Error on liking message. Try again.");
    }
  }

  async function removeReaction() {
    try {
      await removeMessageReaction({ roomId, messageId: id });
      setHasReacted(false);
    } catch (error) {
      toast.error("Error on liking message. Try again.");
    }
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      <button
        onClick={hasReacted ? removeReaction : addReaction}
        type="button"
        className={`mt-3 flex items-center gap-2 text-sm font-medium ${
          hasReacted
            ? "text-orange-400 hover:text-orange-300"
            : "text-zinc-400 hover:text-zinc-300"
        }`}
      >
        <ArrowUp className="size-4" />
        Like ({amountOfReactions})
      </button>
    </li>
  );
}
