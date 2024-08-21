// src/App.tsx
import { useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeView from "./views/HomeView";
import TeaCollectionView from "./views/TeaCollectionView";
import TeaInfoView from "./views/TeaInfoView";
import ProfileView from "./views/ProfileView";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { AuthProvider } from "./components/Auth";
import Footer from './components/Footer';

// Importerar komponenter för olika te-typer
import BlackTeaView from './views/TeaTypeViews/BlackTeaView';
import GreenTeaView from './views/TeaTypeViews/GreenTeaView';
import RedTeaView from './views/TeaTypeViews/RedTeaView';
import YellowTeaView from './views/TeaTypeViews/YellowTeaView';
import OolongTeaView from './views/TeaTypeViews/OolongTeaView';
import HerbalTeaView from './views/TeaTypeViews/HerbalTeaView';
import WhiteTeaView from './views/TeaTypeViews/WhiteTeaView';

// Gränssnitt för användarobjekt
interface User {
  id: number;
  username: string;
  avatar: string;
}

function App() {
  // Tillstånd för lagring av användarinfo.
  const [user, setUser] = useState<User | null>(null);

  // Funktion för att hantera inloggning
  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5555/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Funktion för att hantera registrering
  const handleRegister = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5555/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // Funktion för att hantera utloggning
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AuthProvider>
      <div className="app-container">
        <Router>
          <Header user={user} onLogout={handleLogout} />
          <Routes>
            {/* Definierar rutter för applikationen */}
            <Route path="/" element={<HomeView />} />
            <Route path="/tea-collection" element={<TeaCollectionView />} />
            <Route path="/tea/:id" element={<TeaInfoView />} />
            <Route path="/profile" element={<ProfileView user={user} />} />
            <Route path="/login" element={<LoginForm login={handleLogin} />} />
            <Route path="/register" element={<RegisterForm register={handleRegister} login={handleLogin} />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />

            {/* Rutter för de olika te-typerna */}
            <Route path="/tea-type/black" element={<BlackTeaView />} />
            <Route path="/tea-type/green" element={<GreenTeaView />} />
            <Route path="/tea-type/red" element={<RedTeaView />} />
            <Route path="/tea-type/yellow" element={<YellowTeaView />} />
            <Route path="/tea-type/oolong" element={<OolongTeaView />} />
            <Route path="/tea-type/herbal" element={<HerbalTeaView />} />
            <Route path="/tea-type/white" element={<WhiteTeaView />} />
          </Routes>

          <ScrollToTopButton />
        </Router>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
