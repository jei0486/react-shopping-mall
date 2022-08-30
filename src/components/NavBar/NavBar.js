import React, { useState } from 'react';

import './Sections/Navbar.css';

function NavBar() {


  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">Shop</a>
      </div>

    </nav>
  )
}

export default NavBar