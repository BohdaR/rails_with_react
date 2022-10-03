import React from 'react';

const HiddenMethodInput = ({method}) => {
    return (
        <input type="hidden" name="_method" autoComplete="off" value={method} />
    );
};

export default HiddenMethodInput;
