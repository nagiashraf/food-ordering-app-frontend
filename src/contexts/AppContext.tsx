import { useValidateToken } from "@/api/AuthApi";
import { createContext, ReactNode, useContext } from "react";

type AppContext = {
  isLoggedIn: boolean;
  userEmail?: string | undefined;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { userEmail, isError} = useValidateToken();

  return (
    <AppContext.Provider value={{isLoggedIn: !isError, userEmail}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};