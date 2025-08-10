import SideNavigation from "../_components/SideNavigation";

function layout({ children })
{
  return (
    <div className="min-h-screen bg-primary-950">
      {/* Mobile/Tablet Layout */}
      <div className="block lg:hidden">
        <div className="border-b border-primary-900">
          <SideNavigation />
        </div>
        <div className="p-1 md:p-6">
          {children}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-[16rem_1fr] w-full min-h-screen gap-8 xl:gap-12">
        <div className="border-r border-primary-900">
          <SideNavigation />
        </div>
        <div className="py-6 xl:py-8 pr-6 xl:pr-8 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;