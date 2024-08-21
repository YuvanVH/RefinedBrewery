// Fullstack/Frontend/src/components/ProfilePage.tsx
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  avatar: string;
}

const ProfilePage = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (confirmed && user) {
      try {
        const response = await fetch(`http://localhost:5555/user/${user.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Account deleted successfully.");
          navigate("/login"); // navigerar login page eller home page
        } else {
          alert("Failed to delete account.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("An error occurred while deleting the account.");
      }
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <img src={user.avatar} alt="Avatar" />
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};
// *********** TODO - Styla senare med denna! *************
// width: 100%;
// height: 100%;
// background-color: rgba(255, 255, 255, 0);
// opacity: 0.2;
// background-image: linear-gradient(135deg, #313d36 25%, transparent 25%), linear-gradient(225deg, #313d36 25%, transparent 25%), linear-gradient(45deg, #313d36 25%, transparent 25%), linear-gradient(315deg, #313d36 25%, #fefefe00 25%);
// background-position:
//   40px 0,
//   40px 0,
//   0 0,
//   0 0;
// background-size: 40px 40px;
// background-repeat: repeat;
// border-radius: 10px;
// z-index: -1;
export default ProfilePage;
