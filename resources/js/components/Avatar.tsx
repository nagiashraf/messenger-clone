import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

const Avatar = () => {
  const user = usePage<PageProps>().props.auth.user;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <img
          src={user?.image_url || '/images/placeholder.jpeg'}
          alt="Avatar"
        />
      </div>
    </div>
  );
};

export default Avatar;
