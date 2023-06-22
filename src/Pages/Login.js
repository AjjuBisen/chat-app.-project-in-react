import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import {useNavigate , Link} from "react-router-dom";
import Logo from "../assets/logo.svg";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import { Avatar, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Signup from "./Signup";
 
const theme = createTheme({
    
    palette: {
      primary: {
        main: '#A32Cc4',
      },
      secondary: {
        main: '#A32Cc4',
      },
    },
  
});
const Login=()=>{
    const Navigate =useNavigate();
    const toastOptions = {
        position :"bottom: right",
        autoClose: 8000,
        pauseOnHOver: true,
        deaggable: true,
        theme:"dark",
    };
    useEffect(() => {
        if(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){
            Navigate("/");
        }
    }, []);


    const paperstyle={padding :20,height:'70vh',width:300,margin:"20px auto"}       //aligned login page
    const avtarstyle={backgroundColor:'#A32Cc4'}
    const btnstyle={margin:'8px 0'}

    const { control,handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                username:"",
                password: ""
            }
        }
    );
    const handleOnSubmit = async (data1) => {
            const {username,password }= data1;
            const {data} = await axios.post(loginRoute,{
                username,
                password,
            });
            console.log(data)
            if(data.status === false){
                toast.error(data.msg,toastOptions);
                 }
             if(data.status === true){
                    localStorage.setItem(
                        process.env.REACT_APP_LOCALHOST_KEY,
                        JSON.stringify(data.user)
                    );
                    Navigate("/");
                }
    }

    return(
       <Grid>
        <Paper elevation={10} style={paperstyle}>
                <Grid align='center'>
                    <Avatar style={avtarstyle} sx={{ width: 60, height: 60 }}><LockOutlinedIcon /></Avatar>
                    <h2>LOGIN</h2>
                </Grid>
            &nbsp;  
            <form onSubmit={handleSubmit(handleOnSubmit)}>


                <Controller                            //Username Controller
                    control={control}
                    name="username"
                    rules={{
                        required: {
                            value: true,
                            message: "Username is required",
                        },
                        pattern: {
                            value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
                            message: "Username is not valid",
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            autoComplete="off" 
                            error={!!errors.username}
                            margin="dense"
                            size="small"
                            fullWidth
                            value={field.value}
                            onChange={field.onChange}
                            inputRef={field.ref}
                            label="Username"
                            helperText={errors.username?.message}
                        />

                    )}
                />
 
            &nbsp;
            <Controller             // Password Controller
                    control={control}
                    name="password"
                    rules={{
                        required: {
                            value: true,
                            message: "password is required",
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
                            message: "Password must have atleast 8 character,1 Upper,1 speacial and 1 number",
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            autoComplete="off"
                            error={!!errors.password}
                            margin="dense"
                            size="small"
                            fullWidth
                            value={field.value}
                            onChange={field.onChange}
                            inputRef={field.ref}
                            label="Password"
                            helperText={errors.password?.message}
                            type="password"
                        />
                        
                    )}
                />           
                 
           <ThemeProvider theme={theme}>
            <Button type='Submit' color='primary' variant="contained" style={btnstyle} fullWidth>Login</Button>
            </ThemeProvider> 
             <Typography>
            <Link to="/ForgotPassword">ForgotPassword</Link>
            </Typography> 
            <Grid>

            </Grid>

            
            &nbsp;
            <hr/>
             <Typography> Don't have an account ?
                <Link to="/signup">SignUp</Link>
            </Typography> 
            
            </form>
        </Paper>
       </Grid> 
        )
}
export default Login