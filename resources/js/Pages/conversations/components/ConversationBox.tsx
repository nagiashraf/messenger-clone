import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { format } from "date-fns";

type ConversationBoxProps = {
  data: Conversation;
  selected?: boolean;
}

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const otherUser = useOtherUser(data);

  const handleClick = () => {
    router.get(`/conversations/${data.id}`);
  };

  const lastMessage = data.messages?.[data.messages.length - 1] || null;

  const userEmail = usePage<PageProps>().props.auth.user.email;

  const hasSeen = () => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen_by || [];

    return !!seenArray.find((user) => user.email === userEmail);
  };

  const lastMessageText = () => {
    if (lastMessage?.image_url) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a conversation';
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3",
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {data.is_group ? (
        <AvatarGroup users={data.users!} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">
              { data.name || otherUser.name }
            </p>
            {
              lastMessage?.created_at && (
                <p className="text-xs text-gray-400 font-light">
                  {format(new Date(lastMessage.created_at), "p")}
                </p>
              )
            }
          </div>
          <p className={clsx("truncate text-sm", hasSeen() ? "text-gray-500" : "text-black font-medium")}>
            {lastMessageText()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
