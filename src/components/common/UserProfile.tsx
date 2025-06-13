import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserProfileProps {
  name: string;
  avatarUrl?: string;
  hideNameOnMobile?: boolean;
}

const UserProfile = ({ name, avatarUrl, hideNameOnMobile }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt={name} />
        ) : (
          <AvatarFallback>{name[0]}</AvatarFallback>
        )}
      </Avatar>
      {!hideNameOnMobile && <span className="font-medium text-base text-foreground sm:block hidden">{name}</span>}
    </div>
  );
};

export default UserProfile; 