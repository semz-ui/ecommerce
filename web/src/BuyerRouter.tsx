import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./buyer/pages/Register";
import Login from "./buyer/pages/Login";
import Dashboard from "./buyer/pages/Dashboard";
import Header from "./buyer/components/Header";
import AllProducts from "./buyer/pages/AllProducts";
import Profile from "./buyer/pages/Profile";
import EditDetails from "./buyer/pages/EditDetails";
import Orders from "./buyer/pages/Orders";
import Addresses from "./buyer/pages/Addresses";
import GiftCard from "./buyer/pages/GiftCard";

function BuyerRouter() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-details" element={<EditDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Addresses />} />
          <Route path="/gift-card" element={<GiftCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default BuyerRouter;
