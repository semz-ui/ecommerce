import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../auth/pages/Register";
import Login from "../auth/pages/Login";
import SideNav from "../seller/components/SideNav";
import Dashboard from "../seller/pages/Dashboard";
import Products from "../seller/pages/Products";
import Header from "../buyer/components/Header";
import Profile from "../seller/pages/Profile";
import VerifyEmail from "@/auth/pages/VerifyEmail";

function SellerRouter() {
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <SideNav />
          <div className="w-full">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default SellerRouter;
