// Fullstack/Frontend/src/views/ProfileView.tsx
import React from "react";
import ProfilePage from "../components/ProfilePage";

interface User {
  id: number;
  username: string;
  avatar: string;
}

interface ProfileViewProps {
  user: User | null;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  return (
    <div>
      <ProfilePage user={user} />
    </div>
  );
};

export default ProfileView;
