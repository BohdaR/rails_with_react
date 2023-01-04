import React from 'react';
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {TextField} from "@mui/material";

const PasswordInput = ({label, value, setValue}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <TextField
      sx={{
        marginTop: "10px",
      }}
      variant="standard"
      label={label}
      value={value}
      onChange={(e) => { setValue(e.target.value) }}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />  }
          </IconButton>
        ),
      }}
    />
  );
};

export default PasswordInput;
