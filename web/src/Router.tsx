import { lazy } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
const BuyerRouter = lazy(() => import("./BuyerRouter.js"));
const SellerRouter = lazy(() => import("./SellerRouter.js"));

function Router() {
  const user = useSelector((state: RootState) => state.auth);

  return (
    <>{user?.user?.role === "seller" ? <SellerRouter /> : <BuyerRouter />}</>
  );
}

export default Router;
