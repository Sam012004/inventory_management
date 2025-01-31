import { Box, Typography, TextField, Stack, InputAdornment, Button } from "@mui/material";
import styles from './RightSide.module.css';
import Tooltip from '@mui/material/Tooltip';
import { FaFacebookF, FaUser, FaLock, FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { getErrorMsg } from "../data/errorMsg"
import { UserDetailsError, UserDetailsType } from "../Interface/Login.interface";
import { useNavigate } from "react-router-dom";

const RightSide = () => {
  const [userDetailsError, setUserDetailsError] = useState<UserDetailsError>({ userNameError: '', passwordError: '' });
  const [userDetails, setUserDetails] = useState<UserDetailsType>({ userName: '', password: '' });
 const navigate = useNavigate()
  function handleLogin(event: any) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    let isValid = true;
    let LoginData = [];
    event.preventDefault();

    setUserDetailsError({ userNameError: '', passwordError: '' });

    if (userDetails.userName.trim() === '') {
      setUserDetailsError((prevState) => ({
        ...prevState,
        userNameError: getErrorMsg('1.1', 'email_id_is_empty'),
      }));
      isValid = false;
    } else if (!emailRegex.test(userDetails.userName)) {
      setUserDetailsError((prevState) => ({
        ...prevState,
        userNameError: getErrorMsg('1.2', 'email_id_is_invalid'),
      }));
      isValid = false;
    } else {
      LoginData.push(userDetails.userName);
    }

    if (userDetails.password.trim() === '') {
      setUserDetailsError((prevState) => ({
        ...prevState,
        passwordError: getErrorMsg('1.3', 'password_is_empty'),
      }));
      isValid = false;
    }
    else {
      LoginData.push(userDetails.password);
    }

    if (isValid) {
      console.log("Login successful!");
      console.log(userDetails);
     setUserDetails({
       userName: '', 
       password: '' 
      });

      setUserDetailsError({
         userNameError: '',
         passwordError: ''
      })
      navigate('/homepage');
    }
  }
  
  const handleInputChange = (field: string, value: string) => {
    setUserDetails(prevState => ({
      ...prevState,
      [field]: value
    }));

    if (value.trim() !== '') {
      setUserDetailsError(prevState => ({
        ...prevState,
        [`${field}Error`]: ''
      }));
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <Box className={styles.RightContainer} sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Login
        </Typography>
        <Stack direction={"column"} spacing={2} width={"80%"}>
          <p className={styles.inputLabels}>
            Username<span className={styles.requiredAsterisk}> *</span>
          </p>
          <TextField
            id="outlined-basic"
            size='small'
            className={styles.inputField}
            placeholder="Enter Username"
            variant="outlined"
            value={userDetails.userName}
            onChange={(e) => handleInputChange('userName', e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position='end'><FaUser /></InputAdornment>,
            }}
          />
          <p className={styles.ErrorMessage} style={{whiteSpace:"preserve"}}>
            {userDetailsError.userNameError ? userDetailsError.userNameError : " "}
          </p>

          <p className={styles.inputLabels}>
            Password<span className={styles.requiredAsterisk}> *</span>
          </p>
          <TextField
            id="password"
            placeholder="Enter Password"
            size='small'
            className={styles.inputField}
            variant="outlined"
            type="password"
            value={userDetails.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position='end'><FaLock /></InputAdornment>
            }}
          />
          <p style={{ marginTop: "0px", whiteSpace: "preserve", color: 'red', fontSize: "12px" }}>
            {userDetailsError.passwordError ? userDetailsError.passwordError : " "}
          </p>
        </Stack>
        <Typography variant="body2" className={styles.ForgotPassword}>
          <a href="...">Forgot password?</a>
        </Typography>

        <Button
          variant="contained"
          sx={{ width: "80%", height: "40%" }}
          onClick={handleLogin}
        >
          <Typography style={{ textTransform: 'none', fontWeight: 700 }}>Login</Typography>
        </Button>

        <Typography variant="body2" className={styles.orLogin}>
          or login with social platforms
        </Typography>

        <Stack direction={"row"} spacing={2} className={styles.iconbutton}>
          <Tooltip title="Google" arrow>
            <Button variant="outlined" className={styles.IconButton} sx={{ minWidth: '10px' }}>
              <FcGoogle size={20} />
            </Button>
          </Tooltip>

          <Tooltip title="Facebook" arrow>
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
