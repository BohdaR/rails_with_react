import React from 'react';

const SelectInput = ({optionList, name, ...props}) => {
  return (
    <select name={name} {...props}>
      {optionList.map((option) =>
        <option key={option.id} value={option.id}>
          {option.value}
        </option>
      )}
    </select>
  );
};

export default SelectInput;
