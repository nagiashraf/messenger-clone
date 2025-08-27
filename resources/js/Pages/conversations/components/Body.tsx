import { Message } from "@/types";
import MessageBox from "@/Pages/conversations/components/MessageBox";

type BodyProps = {
  initialMessages: Message[];
};

const Body = ({ initialMessages }: BodyProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {initialMessages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === initialMessages.length - 1}
          data={message}
        />
      ))}
    </div>
  );
};

export default Body;
