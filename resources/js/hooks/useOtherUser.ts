import { Conversation, PageProps, User } from "@/types";
import { usePage } from "@inertiajs/react";

const useOtherUser = (conversation: Conversation | { users: User[]}) => {
  const currentUserEmail = usePage<PageProps>().props.auth.user.email;

  const otherUser = conversation.users!.filter((user) => user.email !== currentUserEmail);

  return otherUser[0];
};

export default useOtherUser;
