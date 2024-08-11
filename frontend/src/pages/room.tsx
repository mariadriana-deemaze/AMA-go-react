import { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import amaLogo from "../assets/ama-logo.svg";
import { RoomMessages } from "../components/room-messages";
import { CreateMessageForm } from "../components/create-message-form";

export function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  function goBack() {
    navigate("/");
  }

  function handleShareRoom() {
    const url = window.location.href.toString();

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url });
    } else {
      navigator.clipboard.writeText(url);
      toast.info("The room URL was copied to your clipboard!");
    }
  }

  if (!roomId)
    return (
      <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
        <div className="flex items-center gap-3 px-3">
          <h1>Error loading room.</h1>
          <button
            onClick={goBack}
            className="ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-zinc-700"
          >
            Take me back
          </button>
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center gap-3 px-3">
        <img src={amaLogo} alt="AMA" className="h-5" />

        <span className="text-sm text-zinc-500 truncate">
          Room code: <span className="text-zinc-300">{roomId}</span>
        </span>

        <button
          type="submit"
          onClick={handleShareRoom}
          className="ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-zinc-700"
        >
          Share
          <Share2 className="size-4" />
        </button>
      </div>

      <div className="h-px w-full bg-zinc-900" />

      <CreateMessageForm roomId={roomId} />

      <Suspense fallback={<h1>Loading...</h1>}>
        <RoomMessages roomId={roomId} />
      </Suspense>
    </div>
  );
}
