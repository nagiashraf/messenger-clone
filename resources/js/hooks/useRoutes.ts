import { router, usePage } from "@inertiajs/react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

const useRoutes = () => {
  const { url } = usePage();

  const routes = [
    {
      label: 'Chats',
      href: '/conversations',
      icon: HiChat,
      active: url === '/conversations',
    },
    {
      label: 'Users',
      href: '/users',
      icon: HiUsers,
      active: url === '/users'
    },
    {
      label: 'Logout',
      href: '#',
      icon: HiArrowLeftOnRectangle,
      onClick: () => {router.post('/logout')},
    },
  ];

  return routes;
};

export default useRoutes;
