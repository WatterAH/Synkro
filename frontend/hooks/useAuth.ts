import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import sessionRouter from "@/routes/session";
import { getExpirationDate } from "@/lib/date";

export const useAuth = () => {
  const router = useRouter();
  const { login } = useUser();
  const [, setCookie] = useCookies();
  const [loading, setLoading] = useState(false);

  const submit = useCallback(
    async (username: string, password: string) => {
      setLoading(true);

      try {
        const { token, user } = await sessionRouter.login(username, password);
        login(user);
        setCookie("token", token, { path: "/", expires: getExpirationDate() });

        router.push("/");
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [login, setCookie, router]
  );

  return { submit, loading };
};

export const useCheckToken = () => {
  const router = useRouter();
  const { user, login } = useUser();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      if (!cookies.token) return router.push("/auth");

      try {
        const user = await sessionRouter.checkAuthToken(cookies.token);
        login(user.user);

        if (user.user.sucursal_id == null) {
          return router.push("/home");
        } else {
          return router.push("/inventario");
        }
      } catch (error) {
        console.log(error);
        return router.push("/auth");
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  return { loading };
};
