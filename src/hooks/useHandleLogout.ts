import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthQueryStore } from "../store/auth-store";
import { useShopStore } from "../store/shop-store";
import { useUserStore } from "../store/user-store";

const useHandleLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { resetUser } = useUserStore();
  const { logout } = useAuthQueryStore();
  const { resetStore } = useShopStore();

  const handleLogout = () => {
    navigate("/");
    setTimeout(() => {
      resetUser();
      resetStore();
      queryClient.setQueryData(["user"], null);
      queryClient.setQueryData(["store"], null);
      logout();
    }, 200);
  };

  return handleLogout;
};

export default useHandleLogout;
