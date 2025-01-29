import { Box, Typography, TextField, Stack, InputAdornment, Button } from "@mui/material";

import styles from './RightSide.module.css'
import Tooltip from '@mui/material/Tooltip';
import { FaFacebookF, FaUser, FaLock, FaGithub} from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
const RightSide = () => {
  return (
    <div>
      <Box className={styles.RightContainer} sx={{ width: '100%', maxWidth: 500 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Login
            </Typography>
               <Stack direction={"column"} spacing={2} width={"80%"}>
                   <TextField id="outlined-basic" size='small' className={styles.inputField} label="Username" variant="outlined" InputProps={{
                  endAdornment: <InputAdornment position='end'><FaUser /></InputAdornment>,
                   }} />
                  <TextField id="password"   label="password" size='small' className={styles.inputField} variant="outlined" type="password" InputProps={{
                  endAdornment: <InputAdornment position='end'><FaLock /></InputAdornment>
                    }} />
              </Stack>
              <Typography variant="body2"  className={styles.ForgotPassword}>
                <a href="...">Forgot password?</a>
              </Typography>

              <Button variant="contained"  sx={{ width: "80%", height:"40%" }}><Typography style={{ textTransform: 'none', fontWeight:700}}>Login</Typography></Button>
                  <Typography variant="body2"  className={styles.orLogin} >
                    or login with social platforms
                  </Typography>
              <Stack direction={"row"} spacing={2} className={styles.iconbutton}>
              <Tooltip title="Google" arrow>
                      <Button variant="outlined"  className={styles.IconButton}  sx={{minWidth:'10px' }} ><FcGoogle size={20} /></Button>
              </Tooltip>

              <Tooltip title="FaceBook" arrow >
                     <Button variant="outlined"  className={styles.IconButton2}   sx={{minWidth:'10px' }} ><FaFacebookF size={20} /></Button>
              </Tooltip>
              <Tooltip title="Github" arrow>
                     <Button variant="outlined" className={styles.IconButton}   sx={{minWidth:'10px' }} ><FaGithub  size={20} /></Button>
              </Tooltip>
              <Tooltip title="LinkedIn" arrow>
                     <Button variant="outlined"  className={styles.IconButton3}   sx={{minWidth:'10px' }} ><IoLogoLinkedin  size={20} /></Button>
              </Tooltip>
         
          
         
        </Stack>

      </Box>
    </div>
  )
}
export default RightSide;