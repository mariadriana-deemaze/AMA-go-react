interface CreateRoomRequest {
  theme: string;
}

export async function createRoom({ theme }: CreateRoomRequest) {
  const request = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms`, {
    method: "POST",
    body: JSON.stringify({
      theme,
    }),
  });

  const data: { id: string } = await request.json();

  return { roomId: data.id };
}
