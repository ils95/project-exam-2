import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Nav() {
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/");
    localStorage.clear();
  }

  return (
    <nav>
      <ul>
        <li>
          {auth ? (
            <>
              | <Link to="/browse">Browse</Link> |{" "}
              <button onClick={logout}>Log out</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
