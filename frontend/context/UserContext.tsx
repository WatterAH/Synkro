import React, { useContext } from "react";
import { defaultUser, User } from "@/interfaces/User";

interface UserContextProps {
  user: User;
  login: (user: User) => void;
  logout: () => void;
}

const defaultUserContext: UserContextProps = {
  user: defaultUser,
  login: () => {},
  logout: () => {},
};

const UserContext = React.createContext<UserContextProps>(defaultUserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User>(defaultUser);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
