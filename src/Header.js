import React,{useState} from 'react';
import './App.css';
import './headerStyle.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    {/* <header className="container-fluid bg-dark text-light py-4">
      <div className="row align-items-center">
        <div className="col-auto">
          <img src="image1.png" alt="Logo" style={{ maxHeight: '150px' }} />
        </div>
        <div className="col-auto mx-3">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="bi bi-list"></i> Menu
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Movies
              </a>
              <a className="dropdown-item" href="#">
                Series
              </a>
              <a className="dropdown-item" href="#">
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <div className="col mx-3">
          <div className="input-group input-group-sm">
            <input type="text" className="form-control form-control-sm" placeholder="Search..." />
            <div className="input-group-append">
              <button className="btn btn-primary btn-sm" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-auto mx-3">
          <div className="d-inline-block mr-4">
            <p className="mb-0">
              <i className="bi bi-plus-circle"></i> Watchlist
            </p>
          </div>
          <div className="d-inline-block mr-4">
            <a href="/login" className="text-light">
              Sign in
            </a>
          </div>
          <div className="d-inline-block">
            <select className="custom-select custom-select-sm">
              <option value="fr">FR</option>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
        </div>
      </div>
    </header> */}


<header className="app-bar">
        <img className="app-bar__logo logo" src="filmdb.png" alt="logo" />
        <div className="app-bar__menu" onClick={toggleMenu}>
          <span className="app-bar__menu-icon">☰</span>
          <span>Menu</span>
        </div>
        {menuOpen && (
          <div className="header-menu">
            <ul className="menu-list">
              <li className="menu-item">
                <a href="/popular">Popular</a>
              </li>
              <li className="menu-item">
                <a href="/toprated">Top Rated</a>
              </li>
              <li className="menu-item">
                <a href="/upcoming">Upcoming</a>
              </li>
            </ul>
          </div>
        )}
        <input className="app-bar__search-field search-field" type="text" placeholder="Search" />
        <div className="app-bar__imdb-pro">
          
        </div>
        <div className="app-bar__watchlist">
          <span>Watchlist</span>
        </div>
        <div className="app-bar__sign-in">
          <span>Sign In</span>
        </div>
        <div className="app-bar__language">
          <span>EN</span>
          <span>▼</span>
        </div>
      </header>
  </>
  );
}

export default Header;
