import SideNavigation from "../_components/SideNavigation";

function layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] w-full h-full gap-12">
      <div>
        <SideNavigation />
      </div>
      <div className="py-1 w-full">{children}</div>
    </div>
  );
}

export default layout;
