import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();

  const LogOutbtn = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div className="main-site-wrapper">
      <div className="main-header-wrapper">
        <header className="main-header">
          <div className="container">
            <div className="header-wrapper">
              <div className="logo">
                <img
                  src="https://img.freepik.com/free-vector/coding-concept-illustration_114360-939.jpg"
                  alt="logo"
                />
              </div>
              <nav id="manu-content">
                {auth ? (
                  <ul className="nav-item">
                    {/* <li>
            <Link to="/profile">Profile</Link>
          </li> */}
                    <ul className="nav-item logout">
                      <li>
                        <Link
                          to="/signup"
                          className="btn-logout"
                          onClick={LogOutbtn}
                        >
                          {JSON.parse(auth).name}
                        </Link>
                      </li>
                    </ul>
                  </ul>
                ) : (
                  <ul className="nav-item-right-side">
                    <li className="s-list">
                      {" "}
                      <Link to="/signup">SignUp</Link>
                    </li>
                    <li className="s-list">
                      <Link to="/login">Login</Link>
                    </li>
                  </ul>
                )}
              </nav>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
