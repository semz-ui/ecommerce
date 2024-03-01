import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../auth/pages/Register";
import Login from "../auth/pages/Login";
import Header from "../buyer/components/Header";
import VerifyEmail from "@/auth/pages/VerifyEmail";

function AuthRouter() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AuthRouter;
