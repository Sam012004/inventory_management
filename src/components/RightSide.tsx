import { Box, Typography, TextField, Stack, InputAdornment, Button } from "@mui/material";
import styles from './RightSide.module.css';
import Tooltip from '@mui/material/Tooltip';
import { FaFacebookF, FaUser, FaLock, FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { getErrorMsg } from "../data/errorMsg";
import { UserDetailsError, UserDetailsType } from "../Interface/Login.interface";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RightSide = () => {
  const [userDetailsError, setUserDetailsError] = useState<UserDetailsError>({ userNameError: '', passwordError: '' });
  const [userDetails, setUserDetails] = useState<UserDetailsType>({ userName: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault(); 

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValid = true;

   
    setUserDetailsError({ userNameError: '', passwordError: '' });

    // Validate email
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
    }

    if (userDetails.password.trim() === '') {
      setUserDetailsError((prevState) => ({
        ...prevState,
        passwordError: getErrorMsg('1.3', 'password_is_empty'),
      }));
      isValid = false;
    }

    if (!isValid) {
      console.log("Form not valid");
      return; 
    }

    try {
      const response = await axios.post('http://localhost:5000/users/login', {
        email: userDetails.userName,
        password: userDetails.password,
      });

      if (response.status === 200) {
        // console.log()
        console.log("role : " + response.data.user.role)
        const userRole = response.data.user.role;
        localStorage.setItem('userRole', userRole);
        if(userRole === 'admin'){
          console.log("admin login successfully");
        }
        console.log('Login successful:', response.data);
        navigate('/homepage');
      } else {
        console.log('Login failed:', response.data.message);
        if (response.data.message === "User not found") {
          setUserDetailsError((prevState) => ({
            ...prevState,
            userNameError: 'User does not exist.',
          }));
        }
      }

    } catch (error:any) {
      console.error('Error during login:', error);
      if (error.response) {
        console.error('Backend error message:', error.response.data);
        setUserDetailsError((prevState) => ({
          ...prevState,
          userNameError: error.response.data.message || 'An error occurred. Please try again.',
        }));
      } else {
        setUserDetailsError((prevState) => ({
          ...prevState,
          userNameError: 'Network error. Please try again later.',
        }));
      }
    }

    setUserDetails({ userName: '', password: '' });
  };

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
            size="small"
            className={styles.inputField}
            placeholder="Enter Username"
            variant="outlined"
            value={userDetails.userName}
            onChange={(e) => handleInputChange('userName', e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end"><FaUser /></InputAdornment>,
            }}
          />
      
          <p className={styles.ErrorMessage} style={{ whiteSpace: "preserve", color: "red" }}>
            {userDetailsError.userNameError ? userDetailsError.userNameError : " "}
          </p>

          <p className={styles.inputLabels}>
            Password<span className={styles.requiredAsterisk}> *</span>
          </p>
          <TextField
            id="password"
            placeholder="Enter Password"
            size="small"
            className={styles.inputField}
            variant="outlined"
            type="password"
            value={userDetails.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end"><FaLock /></InputAdornment>
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
          type="submit"
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
