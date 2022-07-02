import {
    Link
} from 'react-router-dom';
import React, { Component } from 'react';

const Menu = ({ menus }) => {
    return (

        <li>

            {menus.submenu.length ?
                <>
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {menus.name}
                    </a>
                    <ul className="dropdown-menu main-menu msy-sub-menu" aria-labelledby="navbarDropdown">
                        {menus.submenu.map((menu) => (
                            <li className='mx-0' key={menu.id}><Link className="dropdown-item  p-2" to={menu.link} >{menu.name}</Link></li>
                        ))}</ul>
                </>
                : <Link to={menus.link} >{menus.name}</Link>}

        </li>

    )
}

export default Menu
