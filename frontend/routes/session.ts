import { User } from "@/interfaces/User";
import { request } from "@/lib/handlers";

class SessionRouter {
  async login(
    username: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    return request.post("/users/auth", JSON.stringify({ username, password }));
  }

  async checkAuthToken(token: string): Promise<User> {
    return request.post("/users/check-token", JSON.stringify({ token }));
  }
}

const sessionRouter = new SessionRouter();
export default sessionRouter;
