import React, {useState} from 'react';
import {
    Visibility,
    VisibilityOff
} from '@material-ui/icons'
import {
    InputAdornment,
    IconButton,
    TextField
} from '@material-ui/core'


function PasswordInput(props) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <TextField
            required
            fullWidth
            id={props.id}
            name={props.name}
            type={showPassword ? "text" : "password"}
            onChange={props.onChange}
            value={props.value}
            variant="outlined"
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
            }}
            label={props.label}
            size={props.size}
        />
    );
}

export default PasswordInput;