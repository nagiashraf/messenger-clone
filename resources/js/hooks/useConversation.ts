import { usePage } from "@inertiajs/react";
import { Conversation } from "@/types";

const useConversation = () => {
  const { props } = usePage();
  const conversation = props.conversation as Conversation | undefined;

  const conversationId = conversation?.id;

  const isOpen = !!conversationId;

  return {isOpen, conversationId};
};

export default useConversation;
