import { Conversation, Message } from "@/types";
import Layout from "@/Pages/conversations/Layout";
import EmptyState from "@/components/EmptyState";
import Header from "@/Pages/conversations/components/Header";
import Body from "@/Pages/conversations/components/Body";
import Form from "@/Pages/conversations/components/Form";

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
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

ConversationId.layout = (page: any) => <Layout children={page} />

export default ConversationId;
