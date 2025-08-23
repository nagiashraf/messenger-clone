import EmptyState from "@/components/EmptyState";
import UsersLayout from "@/Pages/users/Layout";
import { User } from "@/types";

const Users = ({ users }: { users: User[] }) => {
  return (
    <UsersLayout users={users}>
      <div className="hidden lg:block lg:pl-80 h-full">
        <EmptyState />
      </div>
    </UsersLayout>
  );
};

export default Users;
