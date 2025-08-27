import Avatar from "@/components/Avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation } from "@/types";
import { Link } from "@inertiajs/react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

type HeaderProps = {
  conversation: Conversation;
}

const Header = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);

  const statusText = conversation.is_group
    ? `${conversation.users!.length} members`
    : 'Active';

  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          href="/conversations"
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div>
            {conversation.name || otherUser.name}
          </div>
          <div className="text-xs font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal size={32} className="text-sky-500 hover:text-sky-600 transition cursor-pointer" />
    </div>
  );
};

export default Header;
