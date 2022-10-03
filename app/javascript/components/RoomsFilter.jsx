import React, {useState} from 'react';

const RoomsFilter = ({offices, onChangeLookFromTime, onChangeLookToTime, onChangeFloor, onChangeOfficeId}) => {
    const [value, setValue] = useState('1')

    const [lookFromTime, setLookFromTime] = useState('')
    const [lookToTime, setLookToTime] = useState('')

    return (
        <form>
            <select name="office_id" onChange={(e) => onChangeOfficeId(e.target.value)}>
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
                    onChangeFloor(e.target.value);
                }}/>
            <input
                type="datetime-local"
                value={lookFromTime}
                name="look_from"
                onChange={(e) => {
                    onChangeLookFromTime(e.target.value);
                    setLookFromTime(e.target.value);
                }}/>
            <input
                type="datetime-local"
                value={lookToTime}
                name="look_to"
                onChange={(e) => {
                    onChangeLookToTime(e.target.value);
                    setLookToTime(e.target.value);
                }}/>
        </form>
    );
};

export default RoomsFilter;
