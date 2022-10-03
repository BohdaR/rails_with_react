import React, {useState} from 'react';

const RoomsFilter = ({offices, floorOnChange, office_idOnChange}) => {
    const [value, setValue] = useState('1')

    return (
        <form>
            <select name="office_id" onChange={(e) => office_idOnChange(e.target.value)}>
                {offices.map(office =>
                    <option
                        value={office.id}
                        key={office.id}>
                        {`${office.town}, ${office.street}, ${office.house_number}`}
                    </option>
                )}
            </select>
            <input
                type="number"
                min="1"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    floorOnChange(e.target.value);
                }}/>
            <input type="datetime-local" name="look_from"/>
            <input type="datetime-local" name="look_to"/>
        </form>
    );
};

export default RoomsFilter;
