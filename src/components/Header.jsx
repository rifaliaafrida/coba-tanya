import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectAuth } from '../redux/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
      <Link to="/create-thread" className="nav-link">Tambah Thread</Link>
      <nav>
          {auth.isLoggedIn ? (
            <>
              <Link to="/create-thread" className="nav-link">Tambah Thread</Link>
              <button onClick={handleLogout} className="nav-link">Logout</button>
            </>
          ) : (
            <>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
