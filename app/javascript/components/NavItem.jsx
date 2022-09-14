import React from 'react';

const NavItem = ({href, title}) => {
    return (
        <a href={href}>{title}</a>
    );
};

export default NavItem;