import MainLayout from "@/Layouts/MainLayout";
import { useCartProducts } from "@/Services/Hook";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { data: carts } = useCartProducts() as { data: CartMetaItem[] };

  return (
    <MainLayout title="__" description="__">
      <div className="px-4 py-10 md:py-20 md:px-8 lg:px-12">
        <div className="flex flex-col border boder-white px-3 py-5 rounded-lg justify-between gap-12 lg:flex-row">
          {/* Sidebar */}
          <div className="flex flex-col gap-4 md:py-5">
            <NavLink
              to="/user/carts"
              className={({ isActive }) =>
                `py-1.5 pl-5 pr-20 border-t border-x border-b-2 ${
                  isActive ? "bg-white bg-opacity-20" : "bg-transparent"
                } border-gray-300 text-base font-medium whitespace-nowrap rounded-lg transition-all duration-150 ease-in-out hover:shadow-sm hover:shadow-gray-200 inline-flex gap-3`
              }
            >
              My Carts
              <span className="border border-white rounded px-1.5 bg-white text-rose-700 text-sm font-bold text-center">
                {carts?.length}
              </span>
            </NavLink>
            <NavLink
              to="/user/orders"
              className={({ isActive }) =>
                `py-1.5 pl-5 pr-20 border-t border-x border-b-2 ${
                  isActive ? "bg-white bg-opacity-20" : "bg-transparent"
                } border-gray-300 text-base font-medium whitespace-nowrap rounded-lg transition-all duration-150 ease-in-out hover:shadow-sm hover:shadow-gray-200 inline-flex gap-3`
              }
            >
              My Orders
            </NavLink>
            <NavLink
              to="/user/profile"
              className={({ isActive }) =>
                `py-1.5 pl-5 pr-20 border-t border-x border-b-2 ${
                  isActive ? "bg-white bg-opacity-20" : "bg-transparent"
                } border-gray-300 text-base font-medium whitespace-nowrap rounded-lg transition-all duration-150 ease-in-out hover:shadow-sm hover:shadow-gray-200 inline-flex gap-3`
              }
            >
              Profile
            </NavLink>
          </div>
          {/* Display */}
          <div className="grow h-auto border-t border-gray-500 py-8 md:px-4 lg:px-12 lg:py-0 lg:border-t-0 lg:border-l">
            <Outlet context={{ data: carts }} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
