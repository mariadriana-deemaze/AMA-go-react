interface GetRoomMessagesRequest {
  roomId: string;
}

export interface GetRoomMessagesResponse {
  messages: {
    id: string;
    text: string;
    amountOfReactions: number;
    answered: boolean;
  }[];
}

export async function getRoomMessages({ roomId }: GetRoomMessagesRequest) {
  const request = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`,
    {
      method: "GET",
    }
  );

  const data: {
    ID: string;
    RoomID: string;
    Message: string;
    ReactionCount: number;
    Answered: boolean;
  }[] = await request.json();

  return {
    messages: data.map(({ ID, Message, ReactionCount, Answered }) => ({
      id: ID,
      text: Message,
      amountOfReactions: ReactionCount,
      answered: Answered,
    })),
  };
}
