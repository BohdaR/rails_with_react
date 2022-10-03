import React from 'react';

const NavItemsGroup = ({items, ...props}) => {
  return (
    <div {...props}>
      {items.map(({linkText, ...props}) =>
        <a key={linkText} {...props}>{linkText}</a>
      )}
    </div>
  );
};

export default NavItemsGroup;
