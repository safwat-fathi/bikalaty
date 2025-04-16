"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";

import { User, UserType } from "@/types/models/user.model";

import useLocalStorage from "../hooks/useLocalStorage";

type UserProviderContext = {
  user: User | null;
  userType: UserType;
  handleChangeUserType: (userType: UserType) => void;
  showTypeSelector: boolean;
  setShowTypeSelector: Dispatch<SetStateAction<boolean>>;
};

const UserContext = createContext<UserProviderContext | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export const UserProvider = ({ children, user }: { children: ReactNode; user: User | null }) => {
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [userType, setUserType] = useLocalStorage<UserType>("userType", "customer");

  const handleChangeUserType = (newUserType: UserType) => {
    if (newUserType === userType) return;

    setUserType(newUserType);
  };

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowTypeSelector(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const value = useMemo(
    () => ({ user, userType, handleChangeUserType, showTypeSelector, setShowTypeSelector }),
    [user, userType, handleChangeUserType, showTypeSelector, setShowTypeSelector]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
