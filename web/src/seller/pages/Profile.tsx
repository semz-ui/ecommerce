import { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { logout, reset } from "@/feature/auth/authSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const onLogOut = () => {
    navigate("/");
    dispatch(logout());

    return () => reset();
  };
  return (
    <div onClick={onLogOut}>
      <Button>Logout</Button>
    </div>
  );
}

export default Profile;
