import EmptyState from "@/components/EmptyState";
import Layout from "@/Pages/conversations/Layout";
import clsx from "clsx";

const Conversations = () => {
  return (
    <div
      className={clsx(
        "lg:pl-80 h-full lg:block",
      )}
    >
      <EmptyState />
    </div>
  );
};

Conversations.layout = (page: any) => <Layout children={page} />

export default Conversations;
