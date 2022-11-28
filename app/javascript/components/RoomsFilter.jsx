import React, {useState} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {
  roomsFilter,
  wrapper,
  bookingLabel,
  bookingInput,
  officePicker
} from '../stylesheets/booking.module.css'

const RoomsFilter = ({
                       offices,
                       defaultOffice,
                       floors,
                       defaultFloor,
                       onChangeLookFromTime,
                       onChangeLookToTime,
                       lookFromTime,
                       lookToTime,
                       onChangeFloor,
                       onChangeOfficeId
                     }) => {

  const [office, setOffice] = useState(defaultOffice);
  const [floor, setFloor] = useState(defaultFloor);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {label: "Select an office"},
    {label: "Select an floor"},
    {label: "Pick a start date"},
    {label: "Pick an end date"}
  ];
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const handleReset = () => {
    setActiveStep(0);
  }

  return (
    <div>
    <div>
      <Stepper orientation="vertical" activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
            }>
              {step.label}
            </StepLabel>
            <StepContent>
            <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
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
            <select className={officePicker} name="floor" value={floor} onChange={(e) => {
              onChangeFloor(e.target.value)
              setFloor(e.target.value)
            }}>
              {floors.map(floor =>
                <option
                  value={floor.floor}
                  key={floor.floor}>
                  {floor.floor}
                </option>
              )}
            </select>
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
  </div>
  );
};

export default RoomsFilter;
