interface CreateRoomMessageRequest {
  roomId: string;
  message: string;
}

export async function createRoomMessage({
  roomId,
  message,
}: CreateRoomMessageRequest) {
  const request = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({
        message,
      }),
    }
  );

  const data: { id: string } = await request.json();

  return { roomId: data.id };
}
