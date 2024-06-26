import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  
  return (
    <header className="header">
      <div className="container"> <nav>
              <Link to="/create-thread" >Tambah Thread</Link>
        </nav>
        <Link to="/">logout</Link>

      </div>
    </header>
  );
};

export default Header;
