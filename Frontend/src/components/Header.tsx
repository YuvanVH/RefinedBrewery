import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

interface User {
  id: number;
  username: string;
  avatar: string;
}

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

function Header({ user, onLogout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsSubmenuOpen(false);
  };

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsSubmenuOpen(false);
  };

  return (
    <>
      <header>
        <nav>

          <div id="nav-login-register-menu" className="desktop-only">
            {user ? (
              <>
                <Link to="/profile">Profile</Link>
                <p>/</p>
                <Link to="/logout" onClick={onLogout}>
                  Sign out
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <p>/</p>
                <Link to="/register">Sign in</Link>
              </>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <a className="LogoTitle" href="/">
              <img id="TeaLogo" src="/assets/RefinedBrewery.png" alt="RefinedBrewery Logo" />
              <h1 id="TeaLogoText">RefinedBrewery</h1>
            </a>
          </div>
        </nav>

        <nav className={`navbar ${isOpen ? "active" : ""}`}>
          <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <li>
              <span onClick={toggleSubmenu}>
                <Link to="/tea-collection" onClick={closeMenu}>
                  Tea Collection
                </Link>
              </span>
              <ul className={`submenu ${isSubmenuOpen ? "active" : ""}`}>
                <li>
                  <Link to="/tea-collection" onClick={closeMenu}>
                    All Types Of Tea
                  </Link>
                </li>
                <li>
                  <Link to="/tea-type/black" onClick={closeMenu}>
                    Black Tea
                  </Link>
                </li>
                <li>
                  <Link to="/tea-type/green" onClick={closeMenu}>
                    Green Tea
                  </Link>
                </li>
                <li>
                  <Link to="/tea-type/red" onClick={closeMenu}>
                    Red Tea
                  </Link>
                </li>
                <li>
                  <Link to="/tea-type/yellow" onClick={closeMenu}>
                    Yellow Tea
                  </Link>
                </li>
                <li>
                  <Link to="/tea-type/oolong" onClick={closeMenu}>
                    Oolong Tea
                  </Link>
                </li>
                <li>
                  <Link to="/tea-type/herbal" onClick={closeMenu}>
                    Herbal Tea
                  </Link>
                </li>
                <li>
                  <Link to="/tea-type/white" onClick={closeMenu}>
                    White Tea
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>
            {user ? (
              <>
                <li className="mobile-only">
                  <Link to="/profile" onClick={closeMenu}>
                    Profile
                  </Link>
                </li>
                <li className="mobile-only">
                  <Link to="/logout" onClick={() => {
                    closeMenu();
                    onLogout();
                  }}> Sign out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="mobile-only">
                  <Link to="/login" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
                <li className="mobile-only">
                  <Link to="/register" onClick={closeMenu}>
                    Sign in
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div
            className={`burger-menu ${isOpen ? "active" : ""}`}
            onClick={toggleMenu}>
            <div className={`line1 ${isOpen ? "active" : ""}`}></div>
            <div className={`line2 ${isOpen ? "active" : ""}`}></div>
            <div className={`line3 ${isOpen ? "active" : ""}`}></div>
          </div>
        </nav>
      </header>
      <div className="wave-border"></div>
    </>
  );
}

export default Header;
