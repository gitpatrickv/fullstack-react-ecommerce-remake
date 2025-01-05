import { useAuthQueryStore } from "../../store/auth-store";
import Unauthorized from "./Unauthorized";

interface Props {
  children: React.ReactNode;
}

const UserRoute = ({ children }: Props) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return jwtToken ? <>{children}</> : <Unauthorized />;
};

export default UserRoute;
