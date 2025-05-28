import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../Header";

const Layout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/verify-otp";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className={`flex-1 flex flex-col mt-8  ${
          isAuthPage
            ? "bg-gradient-to-br from-[#eff8ff] to-[#bbddf8] items-center justify-center !mt-0"
            : "bg-white"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
