import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/Pages/users/components/UserList";
import { User } from "@/types";

type UsersLayoutProps = {
  children: React.ReactNode;
  users: User[]
}

const UsersLayout = ({ children, users }: UsersLayoutProps) => {
  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default UsersLayout;
