import { Box, Typography, TextField, Stack, InputAdornment, Button, List, ListItem, ListItemText } from "@mui/material";
import { MdEmail } from "react-icons/md";
import styles from './RegisterLeftSide.module.css';
import Tooltip from '@mui/material/Tooltip';
import { FaFacebookF, FaUser, FaLock, FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { RegisterUserDetailError, RegisterUserDetailType } from "../Interface/Login.interface";

import {  getErrorMsg } from '../data/errorMsg';

const RightSide = () => {
  const [registerUserDetails, setRegisterUserDetails] = useState<RegisterUserDetailType>({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [registerUserDetailsError, setRegisterUserDetailsError] = useState<RegisterUserDetailError>({
    userNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: ''
  });

  function handleSubmit(event: any) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    let isValid = true;
    event.preventDefault();

    const errorMessages = {
      userNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    };

    const errors: string[] = [];

    if (registerUserDetails.userName.trim() === '') {
      errorMessages.userNameError = getErrorMsg('2.1', 'user_name_is_empty'); 
      // errors.push(getErrorMsg('2.1', 'REGISTER_PAGE'));
      isValid = false;
    }

    if (registerUserDetails.email.trim() === '') {
      errorMessages.emailError = getErrorMsg('2.2', 'email_id_is_empty');
      // errors.push(getErrorMsg('2.2', 'email_id_is_empty'));
      // errors.push(errorMessages.emailError);

      isValid = false;
    } else if (!emailRegex.test(registerUserDetails.email)) {
      errorMessages.emailError = getErrorMsg('2.3', 'email_id_is_invalid');
      errors.push(getErrorMsg('2.3', 'email_id_is_invalid'));
      isValid = false;
    }


    if (registerUserDetails.password.trim() === '') {
      errorMessages.passwordError = getErrorMsg('2.4', 'password_is_empty');
      errors.push(getErrorMsg('2.4', 'password_is_empty'));
      isValid = false;
    } else if (!passwordRegex.test(registerUserDetails.password)) {
      errorMessages.passwordError = getErrorMsg('2.7', 'password_is_Invalid');
      errors.push(getErrorMsg('2.7', 'password_is_Invalid'));
      isValid = false;
    }

    if (registerUserDetails.confirmPassword.trim() === '') {
      errorMessages.confirmPasswordError = getErrorMsg('2.5', 'confirm_password');
      errors.push(getErrorMsg('2.5', 'confirm_password'));
      isValid = false;
    } else if (registerUserDetails.password !== registerUserDetails.confirmPassword) {
      errorMessages.confirmPasswordError = getErrorMsg('2.6', 'confirm_password_mismatch');
      errors.push(getErrorMsg('2.6', 'confirm_password_mismatch'))
      isValid = false;
    }

    setRegisterUserDetailsError(errorMessages);

    if (isValid) {
      console.log(registerUserDetails); 

      setRegisterUserDetails({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setRegisterUserDetailsError({
        userNameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
      });
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setRegisterUserDetails(prevState => ({
      ...prevState,
      [field]: value
    }));

    if (value.trim() !== '') {
      setRegisterUserDetailsError(prevState => ({
        ...prevState,
        [`${field}Error`]: '' 
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className={styles.RegisterLeftSideContainer} sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Registration
        </Typography>
        <Stack direction={"column"} spacing={2} width={"80%"}>
          <p className={styles.inputLabels}>
            UserName<span className={styles.requiredAsterisk}> *</span>
          </p>
          <TextField
            id="outlined-basic"
            size='small'
            className={styles.inputField}
            variant="outlined"
            value={registerUserDetails.userName}
            placeholder="Enter Username"
            onChange={(e) => handleInputChange('userName', e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position='end'><FaUser /></InputAdornment>,
            }}
          />
          <p style={{ marginTop: "0px", whiteSpace: "preserve", color: 'red', fontSize: "12px" }}>
            {registerUserDetailsError.userNameError ? registerUserDetailsError.userNameError : " "}
          </p>

          <p className={styles.inputLabels}>
            Email <span className={styles.requiredAsterisk}> *</span>
          </p>

          <TextField
            id="outlined-basic"
            size='small'
            className={styles.inputField}
            placeholder="Enter Email"
            variant="outlined"
            value={registerUserDetails.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position='end'><MdEmail /></InputAdornment>,
            }}
          />
          <p style={{ marginTop: "0px", whiteSpace: "preserve", color: 'red', fontSize: "12px" }}>
            {registerUserDetailsError.emailError ? registerUserDetailsError.emailError : ' '}
          </p>

          <p className={styles.inputLabels}>
            Password<span className={styles.requiredAsterisk}> *</span>
          </p>
          <TextField
            id="password"
            size='small'
            className={styles.inputField}
            variant="outlined"
            value={registerUserDetails.password}
            placeholder="Enter Password"
            onChange={(e) => handleInputChange('password', e.target.value)}
            type="password"
            InputProps={{
              endAdornment: <InputAdornment position='end'><FaLock /></InputAdornment>
            }}
          />
          <p style={{ marginTop: "0px", whiteSpace: "preserve", color: 'red', fontSize: "12px" }}>
            {registerUserDetailsError.passwordError ? registerUserDetailsError.passwordError : ' '}
          </p>

          <p className={styles.inputLabels}>
            Confirm Password<span className={styles.requiredAsterisk}> *</span>
          </p>
          <TextField
            id="confirmPassword"
            size='small'
            className={styles.inputField}
            variant="outlined"
            value={registerUserDetails.confirmPassword}
            placeholder="Enter Confirm Password"
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            type="password"
            InputProps={{
              endAdornment: <InputAdornment position='end'><FaLock /></InputAdornment>
            }}
          />
          <p style={{ marginTop: "0px", whiteSpace: "preserve", color: 'red', fontSize: "12px" }}>
            {registerUserDetailsError.confirmPasswordError ? registerUserDetailsError.confirmPasswordError : " "}
          </p>
        </Stack>

        <Button variant="contained" sx={{ width: "80%", height: "40%" }} type="submit">
          <Typography style={{ textTransform: 'none', fontWeight: 700 }}>Signup</Typography>
        </Button>

       

        <Typography variant="body2" className={styles.orLogin}>
          or Signup with social platforms
        </Typography>
        <Stack direction={"row"} spacing={2} className={styles.iconbutton}>
          <Tooltip title="Google" arrow>
            <Button variant="outlined" className={styles.IconButton} sx={{ minWidth: '10px' }}>
              <FcGoogle size={20} />
            </Button>
          </Tooltip>

          <Tooltip title="FaceBook" arrow>
            <Button variant="outlined" className={styles.IconButton2} sx={{ minWidth: '10px' }}>
              <FaFacebookF size={20} />
            </Button>
          </Tooltip>
          <Tooltip title="Github" arrow>
            <Button variant="outlined" className={styles.IconButton} sx={{ minWidth: '10px' }}>
              <FaGithub size={20} />
            </Button>
          </Tooltip>
          <Tooltip title="LinkedIn" arrow>
            <Button variant="outlined" className={styles.IconButton3} sx={{ minWidth: '10px' }}>
              <IoLogoLinkedin size={20} />
            </Button>
          </Tooltip>
        </Stack>
      </Box>
    </form>
  );
};

export default RightSide;
