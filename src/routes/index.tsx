import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { UserRoutes } from "./UserRoutes";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading";

export function Routes() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      {session?.token ? <UserRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}
