import { cn } from "@/components/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { profileData } from "@/utils/profileData";
import { logout, reset } from "@/feature/auth/authSlice";
import { AppDispatch } from "@/app/store";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const onLogOut = () => {
    navigate("/");
    dispatch(logout());

    return () => reset();
  };
  return (
    <MaxWidthWrapper className={cn("max-w-screen-md")}>
      <h1 className="text-4xl font-medium text-center">Your Account</h1>
      <div className="w-full flex flex-wrap justify-center gap-5 mt-10">
        {profileData.map((data) => (
          <Link
            to={`${data.link}`}
            className={cn(
              "flex items-center w-[300px] border min-h-[100px] rounded-sm p-2 hover:bg-gray-50 cursor-pointer"
            )}
          >
            <img src={data.image} className={cn("w-[50px] h-[50px]")} />
            <div className={cn("mx-3")}>
              <h1>{data.title}</h1>
              <p className={cn("text-sm text-gray-500")}>{data.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className={cn("flex justify-center")}>
        <Button className={cn("w-2/3 mt-20")} onClick={onLogOut}>
          Logout
        </Button>
      </div>
    </MaxWidthWrapper>
  );
}

export default Profile;
