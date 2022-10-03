import React from 'react';

const SubmitInput = ({value, ...props}) => {
    return (
        <input type="submit" name="commit" value={value} {...props} />
    );
};

export default SubmitInput;
