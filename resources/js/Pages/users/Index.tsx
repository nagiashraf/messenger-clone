import EmptyState from "@/components/EmptyState";
import UsersLayout from "@/Pages/users/Layout";

const Users = () => {
  return (
    <UsersLayout>
      <div className="hidden lg:block lg:pl-80 h-full">
        <EmptyState />
      </div>
    </UsersLayout>
  );
};

export default Users;
