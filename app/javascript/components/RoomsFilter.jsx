import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import {
  roomsFilter,
  wrapper,
  bookingLabel,
  bookingInput,
  officePicker
} from "../stylesheets/booking.module.css";

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

  const useStyles = makeStyles(() => ({
    root: {
      "& .Mui-active .MuiStepIcon-root": { color: "#173166" },
      "& .Mui-completed .MuiStepIcon-root": { color: "#173166" },
      "& .MuiStepLabel-label": { fontSize: "18px", color: "#173166" },
      "& .MuiButton-contained": { background: "#173166" },
      "& .MuiButton-contained:hover": { background: "#94a412" },
      "& .MuiStepIcon-text": { fontSize: "15px"}
    }
  }));

  const classes = useStyles();
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  return (
    <div className={roomsFilter}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Stepper orientation="vertical" activeStep={activeStep} className={classes.root}>
          <Step>
            <StepLabel>Select an office </StepLabel>
            <StepContent>
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
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  size="small"
                >
                  Continue
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Select a floor</StepLabel>
            <StepContent>
              <div className={wrapper}>
                <label className={bookingLabel}>Pick a floor
                  <select className={officePicker} name="floor" value={floor} onChange={(e) => {
                    onChangeFloor(e.target.value)
                    setFloor(e.target.value)
                  }}>
                    <option value="floor number">Please choose a floor</option>
                    <optgroup label="───────────"></optgroup>
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
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  size="small"
                  sx={{ mt: 1, mr: 1 }}
                >
                Continue
                </Button>
                <Button
                  onClick={handleBack}
                  size="small"
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Pick a start date</StepLabel>
            <StepContent>
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
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  size="small"
                  sx={{ mt: 1, mr: 1 }}
                >
                Continue
                </Button>
                <Button
                  onClick={handleBack}
                  size="small"
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Pick an end date</StepLabel>
            <StepContent>
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
              <div>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  size="small"
                >
                  Finish
                </Button>
                <Button
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                  size="small"
                >
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>
        </Stepper>
      </form>
    </div>
  );
};

export default RoomsFilter;
