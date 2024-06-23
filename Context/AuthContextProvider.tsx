import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>({
  UserloggedIn: false,
  loading: false,
  currentUser: null,
});

export default function AuthContextProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [currentUser, setcurrentUser] = useState<any>();
  const [isUserloggedIn, setisUserloggedIn] = useState<boolean | undefined>(
    undefined
  );

  const getUserFromLocalStorage = async () => {
    const userDetails = await AsyncStorage.getItem("@user");
    const user = await JSON.parse(userDetails);
    if (user) {
      setcurrentUser(user);
      setisUserloggedIn(true);
    } else {
      setcurrentUser(null);
      setisUserloggedIn(false);
    }
  };

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isUserloggedIn, currentUser, setcurrentUser, setisUserloggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
