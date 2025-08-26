import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "@/Pages/conversations/components/ConversationList";
import { Conversation } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type LayoutProps = {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch('/api/conversations');
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        toast.error('Something went wrong');
      }
    };

    fetchConversations();
  }, []);

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default Layout;
