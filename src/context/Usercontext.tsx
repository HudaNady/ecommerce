import React, { useState, createContext, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export interface UserData {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export interface UserContextType {
  userToken: string | null;
  setuserToken: React.Dispatch<React.SetStateAction<string | null>>;
  data: UserData | null;
}

export const UserContext = createContext<UserContextType>({
  userToken:null,
  setuserToken: () => {},
  data: null,
});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setuserToken] = useState<string | null>(null);
  const [data, setdata] = useState<UserData | null>(null);

  useEffect(() => {
    if (userToken !== null) {
      const decodedToken = jwtDecode<UserData>(userToken);
      setdata(decodedToken);
    } else {
      setdata(null);
    }
  }, [userToken]);

  return (
    <UserContext.Provider value={{ userToken, setuserToken, data }}>
      {children}
    </UserContext.Provider>
  );
}