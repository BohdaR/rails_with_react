import React, {useState} from 'react';

const RoomsFilter = ({
                       offices,
                       defaultOffice,
                       onChangeLookFromTime,
                       onChangeLookToTime,
                       lookFromTime,
                       lookToTime,
                       onChangeFloor,
                       onChangeOfficeId
                     }) => {
  const [value, setValue] = useState('1')
  const [office, setOffice] = useState(defaultOffice)

  return (
    <form>
      <select name="office_id" value={office} onChange={(e) => {
        onChangeOfficeId(e.target.value)
        setOffice(e.target.value)
      }}>
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
        min={lookFromTime}
        name="look_from"
        onChange={(e) => {
          onChangeLookFromTime(e.target.value);
        }}/>
      <input
        type="datetime-local"
        value={lookToTime}
        min={lookFromTime}
        name="look_to"
        onChange={(e) => {
          onChangeLookToTime(e.target.value);
        }}/>
    </form>
  );
};

export default RoomsFilter;
