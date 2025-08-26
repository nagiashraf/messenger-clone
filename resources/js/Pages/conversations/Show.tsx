import { Conversation, Message } from "@/types";
import Layout from "@/Pages/conversations/Layout";
import EmptyState from "@/components/EmptyState";

type ShowProps = {
  conversation: Conversation;
  messages: Message[];
}

const ConversationId = ({ conversation, messages }: ShowProps) => {
  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">

      </div>
    </div>
  );
};

ConversationId.layout = (page: any) => <Layout children={page} />

export default ConversationId;
