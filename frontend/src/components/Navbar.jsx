
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ title }) {
  const navigate = useNavigate();

  function logout() {
    sessionStorage.removeItem('loggedInUser');
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Feedback System
        </Link>

        <div className="d-flex align-items-center">
          <span className="text-white me-3">{title}</span>
          <button className="btn btn-light btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
