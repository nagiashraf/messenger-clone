import { Message } from "@/types";
import MessageBox from "@/Pages/conversations/components/MessageBox";
import useConversation from "@/hooks/useConversation";
import { useState } from "react";
import { useEcho } from "@laravel/echo-react";

type BodyProps = {
  initialMessages: Message[];
};

const Body = ({ initialMessages }: BodyProps) => {
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  useEcho<{ message: Message }>(
    `messages.new.${conversationId}`,
    "MessageSent",
    e => setMessages((prevMessages) => [...prevMessages, e.message]),
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          data={message}
        />
      ))}
    </div>
  );
};

export default Body;
