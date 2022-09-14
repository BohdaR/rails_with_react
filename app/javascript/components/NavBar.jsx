import React from 'react';

const NavBar = ({leftItems, rightItems}) => {
    return (
        <div className="topnav">
            <a className="active" href="#">Home</a>
            <a href="#">News</a>
            <a href="#">Contact</a>
            <div className="topnav-right">
                <a href="#">Search</a>
                <a href="#">About</a>
            </div>
        </div>
    );
};

export default NavBar;