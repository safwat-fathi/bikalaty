"use client";

import UserTypeSelector from "@/lib/components/UserTypeSelector";
import { useUser } from "@/lib/providers/user.provider";

const UserType = () => {
  const { showTypeSelector, setShowTypeSelector } = useUser();

  return <UserTypeSelector open={showTypeSelector} onClose={() => setShowTypeSelector(false)} />;
};

export default UserType;
