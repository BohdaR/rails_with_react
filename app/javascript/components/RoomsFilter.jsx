import React, {useState} from 'react';
import {roomsFilter,
  wrapper,
  bookingLabel,
  bookingInput,
  officePicker} from '../stylesheets/booking.module.css'

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
    <div className={roomsFilter}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={wrapper}>
          <label className={bookingLabel}>Pick an office
            <select className={officePicker} name="office_id" value={office} onChange={(e) => {
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
          </label>
        </div>
        <div className={wrapper}>
          <label className={bookingLabel}>Pick a floor
            <input
              className={bookingInput}
              type="number"
              min="1"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                onChangeFloor(e.target.value);
              }}/>
          </label>
        </div>
        <div className={wrapper}>
          <label className={bookingLabel}>Pick a start date
            <input
              className={bookingInput}
              type="datetime-local"
              value={lookFromTime}
              min={lookFromTime}
              name="look_from"
              onChange={(e) => {
                onChangeLookFromTime(e.target.value);
              }}/>
          </label>
        </div>
        <div className={wrapper}>
          <label className={bookingLabel}>Pick an end date
            <input
              className={bookingInput}
              type="datetime-local"
              value={lookToTime}
              min={lookFromTime}
              name="look_to"
              onChange={(e) => {
                onChangeLookToTime(e.target.value);
              }}/>
          </label>
        </div>
      </form>
    </div>
  );
};

export default RoomsFilter;
