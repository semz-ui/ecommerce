import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store.ts";
// const AuthRouter = lazy(() => import("./AuthRouter.tsx"));
const BuyerRouter = lazy(() => import("./BuyerRouter.tsx"));
const SellerRouter = lazy(() => import("./SellerRouter.tsx"));

function Router() {
  const user = useSelector((state: RootState) => state.auth);
  console.log(user.user, "user");

  return (
    <Suspense fallback={<>Loading</>}>
      {user?.user?.role === "seller" ? <SellerRouter /> : <BuyerRouter />}
      {/* <AuthRouter /> */}
    </Suspense>
  );
}

export default Router;
