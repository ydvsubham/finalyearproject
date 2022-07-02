import Menu from './Menu'
import React, { useEffect } from 'react';

const Header = ({menu,mobileMenu,toggleMobilemenu}) => {

  
  return (
    <header className="main-header clearfix  msy-main-header" role="header">
      <div className="logo">
        <a href="#"><em>Project</em> Spring</a>
      </div>
      <a href="#menu" id="mobileMenuBtn"  className="menu-a" onClick={toggleMobilemenu}><i className="fa fa-bars"></i></a>
      <nav id="menu" className="main-nav" role="navigation">
     
        <ul className="main-menu" id="mobileMenu" style={{display : `${mobileMenu ? 'block' : 'none'}`}}>
        {menu.map((menus)=>(
                <Menu menus={menus} key={menus.id}/>
            ))}
            
        </ul>
        
      </nav>
    </header>
  )
}
Header.defaultProps ={
  menuDisplay : 'none',
  text : 'add',
}

export default Header
