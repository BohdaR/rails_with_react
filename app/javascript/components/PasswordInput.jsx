import React from 'react';

const PasswordInput = ({...props}) => {
    return (
        <input autoComplete="password" type="password" {...props} />
    );
};

export default PasswordInput;
