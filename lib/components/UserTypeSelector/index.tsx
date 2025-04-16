"use client";

import { useUser } from "@/lib/providers/user.provider";
import { UserType } from "@/types/models/user.model";

import Modal from "../Modal";

const UserTypeOption = ({
  type,
  title,
  description,
  icon,
  onSelect,
}: {
  type: UserType;
  title: string;
  description: string;
  icon: any;
  onSelect: (type: UserType) => void;
}) => {
  return (
    <div
      className="hover:border-primary hover:bg-primary/5 cursor-pointer rounded-lg border p-4 transition-all"
      onClick={() => onSelect(type)}
    >
      <div className="flex flex-col items-center space-y-3 text-center">
        <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-full">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

const UserTypeSelector = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { handleChangeUserType } = useUser();

  const handleSelect = (type: UserType) => {
    handleChangeUserType(type);
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Welcome to Bikalaty">
      <div className="sm:max-w-md">
        <div>
          <p>Please select how you&apos;ll be shopping with us to get personalized pricing and offers.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3">
          <UserTypeOption
            type="customer"
            title="Home User"
            description="Shopping for your household"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
            }
            onSelect={handleSelect}
          />

          <UserTypeOption
            type="retailer"
            title="Retailer"
            description="For small shops and stores"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
                <path d="M2 7h20"></path>
                <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"></path>
              </svg>
            }
            onSelect={handleSelect}
          />

          <UserTypeOption
            type="wholesaler"
            title="Wholesaler"
            description="For bulk purchases"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                <path d="M10 6h4"></path>
                <path d="M10 10h4"></path>
                <path d="M10 14h4"></path>
                <path d="M10 18h4"></path>
              </svg>
            }
            onSelect={handleSelect}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UserTypeSelector;
