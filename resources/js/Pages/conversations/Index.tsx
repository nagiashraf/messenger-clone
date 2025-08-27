import EmptyState from "@/components/EmptyState";
import useConversation from "@/hooks/useConversation";
import Layout from "@/Pages/conversations/Layout";
import clsx from "clsx";

const Conversations = () => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx(
        "lg:pl-80 h-full lg:block",
        isOpen ? 'block' : 'hidden'
      )}
    >
      <EmptyState />
    </div>
  );
};

Conversations.layout = (page: any) => <Layout children={page} />

export default Conversations;
