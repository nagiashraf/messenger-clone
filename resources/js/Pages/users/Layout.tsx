import Sidebar from "@/components/sidebar/Sidebar";

type UsersLayoutProps = {
  children: React.ReactNode;
}

const UsersLayout = ({ children }: UsersLayoutProps) => {
  return (
    <Sidebar>
      <div className="h-full">
        {children}
      </div>
    </Sidebar>
  );
};

export default UsersLayout;
