import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="mt-4">
          <Outlet />
        </div>
      </div>

      {/* Footer placed outside the centered container so its background can span full width */}
      <Footer />

      <ToastContainer />
    </div>
  );
};

export default MainLayout;
