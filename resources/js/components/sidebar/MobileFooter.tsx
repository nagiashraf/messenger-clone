import useRoutes from "@/hooks/useRoutes";
import MobileItem from "@/components/sidebar/MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
