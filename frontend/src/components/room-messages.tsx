import { getRoomMessages } from "../http/get-room-messages";
import { Message } from "./message";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useWSMessages } from "../hooks/use-ws-messages";

export function RoomMessages({ roomId }: { roomId: string }) {
  useWSMessages({ roomId });

  const { data } = useSuspenseQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  const sortedMessages = data.messages.sort((a, b) => {
    return b.amountOfReactions - a.amountOfReactions;
  });

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map((message) => (
        <Message key={message.id} roomId={roomId} message={message} />
      ))}
    </ol>
  );
}
