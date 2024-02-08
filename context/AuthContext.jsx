"use client";

import { getCorrentAccount } from "@/lib/services/apiAuth";
import axios from "axios";

const {
  createContext,
  useState,
  useContext,
  useEffect,
  cache,
} = require("react");

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthContext = createContext();

export const $apiAuth = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    try {
      setIsLoading(true);
      const currentAccount = await getCorrentAccount();


      if (currentAccount) {
        setIsAuthenticated(true);
        setUser({
          id: currentAccount._id,
          name: currentAccount.name,
          surname: currentAccount.surname,
          email: currentAccount.email,
          isAdmin: currentAccount.role == "admin",
          patronymic: currentAccount.patronymic,
          comment: currentAccount?.comment ? currentAccount.comment : ''
        });

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  $apiAuth.interceptors.request.use((config) => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  });

  $apiAuth.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        (error.response.status === 401 ||
          error.response.data.message === "jwt expired") &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const response = await $api.post(`${API_URL}/auth/refresh`, {
            withCredentials: true,
          });

          const user = response.data.userData.user;

          if (typeof window !== "undefined") {
            localStorage.setItem("token", response.data.userData.accessToken);
          }

          setUser({
            id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.role === "admin",
          });
          return $apiAuth(originalRequest);
        } catch (e) {
          console.log("Unauthorized");
          setUser({});
          setIsAuthenticated(false);
        }
      }
      throw error;
    }
  );

  useEffect(() => {
    let token;

    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    if (token === "[]" || token === null || isAuthenticated) {
      return;
    }
    console.log("resfresh");

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
