import React, { createContext } from "react";
import { useAuthUser } from "./Hook";
import { AuthUserType } from "@/Types/Auth";

const AppContext = createContext<{
  user: AuthUserType;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data } = useAuthUser();
  return (
    <AppContext.Provider value={{ user: data }}>{children}</AppContext.Provider>
  );
};
