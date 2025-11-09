import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";


const MainLayout = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        
        <div className="mt-4">
          <Outlet />
        </div>
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default MainLayout;
