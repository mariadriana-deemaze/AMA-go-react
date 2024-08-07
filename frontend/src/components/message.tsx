import { ArrowUp } from "lucide-react";
import { useState } from "react";

interface MessageProps {
  text: string;
  amountOfReactions: number;
  answered?: boolean;
}

export function Message({
  text,
  amountOfReactions,
  answered = false,
}: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false);

  function handleReactToMessage() {
    setHasReacted(true);
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      <button
        onClick={hasReacted ? () => {} : handleReactToMessage}
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
