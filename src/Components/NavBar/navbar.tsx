import { Link } from "react-router-dom";

interface NavBarProps {
  isUserSignedIn: boolean;
  handleSignOut: () => void;
}

function NavBar({ isUserSignedIn, handleSignOut }: NavBarProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {isUserSignedIn ? (
              <li className="nav-item">
                <button className="nav-link" onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            ) : null}
            {!isUserSignedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              </li>
            ) : null}
            {!isUserSignedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
