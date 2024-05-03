import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './App.css';
import './headerStyle.css';

function Header() {

  const supabase = createClient('https://ksnouxckabitqorjucgz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzbm91eGNrYWJpdHFvcmp1Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MzM4ODgsImV4cCI6MjAzMDAwOTg4OH0.17MF1DByop1lCcnefGB8t3AcS1CGcJvbzunwY3QbK_c');

  const navigate = useNavigate();

  const [user, setUser] = useState(null); // State to store the user object

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(()=>{

    // Function to fetch user data
    const fetchUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user data:', error.message);
      } else {
        setUser(user); // Set the user state with the fetched user data
      }
    };

    fetchUserData(); // Call the fetchUserData function when the component mounts
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('User signed out');
      setUser(null); // Update the user state to null upon successful logout
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header className="app-bar">
        <a href='/'><img className="app-bar__logo logo" src="filmdb.png" alt="logo" /></a>
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
        <div className="col mx-3">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control form-control-sm me-2"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchInput}
            />
            <button className="btn btn-primary btn-sm" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>

        <div className="app-bar__watchlist">
          <a href="/watchlist"><span>Watchlist</span></a>
        </div>

        {user ? (
          <div className="logout-container">
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button> 
          </div>
        ) : (
          <div className="app-bar__sign-in">
            <a href="/signin" className="btn btn-warning">Sign In</a>
          </div>
        )}
        
        <div className="app-bar__user">
          <a href="/user"><span>Username</span></a>
        </div>
      </header>
    </>
  );
}

export default Header;
