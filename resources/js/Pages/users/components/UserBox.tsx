import Avatar from "@/components/Avatar";
import { User } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";

type UserBoxProps = {
  data: User;
}

const UserBox = ({ data }: UserBoxProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    router.post(
      '/conversations',
      { user_id: data.id },
      { onFinish: () => setIsLoading(false) }
    );
  };

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
    >
      <Avatar user={data} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">
              {data.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
