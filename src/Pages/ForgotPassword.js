import React from "react";
import { Avatar, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from "@mui/material/Button";
import Signup from "./Signup";
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom";
import { Controller } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Link from "@mui/material/Button";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
const theme = createTheme({
                                                                           //run
    palette: {                                                        //terminer.....new terminer
      primary: {                                                     //cd server
                                                                    //npm start  .....sell      
        main: '#A32Cc4',                                           //cd public 
      },                                                            //npm start....crome new inogointo windos
      secondary: {
        main: '#A32Cc4',
      },
    },
  
});

const ForgotPassword=()=>{
    const paperstyle={padding :20,height:'60vh',width:300,margin:"30px auto"}       //aligned login page
    const avtarstyle={backgroundColor:'#A32Cc4'}
    const btnstyle={margin:'8px 0'}

    const { control, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                username:""
            }
        }
    );
    const handleOnSubmit = (data) => {
        console.log(data);
    }

    return(
       <Grid>
        <Paper elevation={10} style={paperstyle}>

            <Grid align='center'>           
            <Avatar style={avtarstyle}  sx={{ width: 60, height: 60 }}><LockOutlinedIcon/></Avatar>
            <h2>Trouble logging in?</h2>
            <Typography variant='caption' gutterBottom>Enter your email and we'll send you a link to get back into your account.</Typography>
         </Grid>
            &nbsp;  
            <form onSubmit={handleSubmit(handleOnSubmit)}>

            <Controller                     //Email Controller
                    control={control}
                    name="email"
                    rules={{
                        required: {
                            value: true,
                            message: "Email is required",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                            message: "Email is not valid",
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            autoComplete="off"
                            error={!!errors.email}
                            margin="dense"
                            size="small"
                            fullWidth
                            value={field.value}
                            onChange={field.onChange}
                            inputRef={field.ref}
                            label="Email"
                            helperText={errors.email?.message}
                        />

                    )}
                />  
                                        <ThemeProvider theme={theme}>
            <Button type='send login link' color='primary' variant="contained" style={btnstyle} fullWidth>send login link</Button>
            </ThemeProvider>
            &nbsp;
            {/* <hr/> */}
            <p>-------------------------OR --------------------------</p>
            &nbsp;

            <Typography align='center'>
            <ThemeProvider theme={theme}>

            <Link to="/signup">Create new account</Link>
            </ThemeProvider>
            </Typography>

            &nbsp;

            <Typography align='center'>
            <ThemeProvider theme={theme}>

            <Link to="/">Back to login</Link>
            </ThemeProvider>
        </Typography>
        </form>
        </Paper>
       </Grid> 
        )
}
export default ForgotPassword 