import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A32Cc4",
    },
    secondary: {
      main: "#A32Cc4",
    },
  },
});

const Signup = () => {
  const navigate = useNavigate();
  const toastoptions = {
    position: "bottom-right",
    autoclose: 8000,
    pauseonHover: true,
    deaggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ",",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);
  const handlechange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handlevalidation = () => {
    const { password, confirmpassword, username, email } = values;
    console.log(values);
    if (password !== confirmpassword) {
      toast.error(
        "password and confirm password should be same. ",
        toastoptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastoptions
      );
      return false;
    } else if (password.length < 3) {
      toast.error(
        "Password should be grater than 8 characters. ",
        toastoptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is Required.", toastoptions);
      return false;
    }
    return true;
  };
  const paperstyle = { padding: "30px 20px", width: 300, margin: "70px auto" };
  const headerstyle = { margin: 0 };
  const avatarstyle = { backgroundColor: "#A32Cc4" };
  const marginTop = { marginTop: 5 };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const handleOnSubmit = async (data1) => {
      const { email, username, password } = data1;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastoptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperstyle}>
        <Grid align="center">
          <Avatar style={avatarstyle} sx={{ width: 60, height: 60 }}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          &nbsp;
          <h2 style={headerstyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Controller //Username Controller
            control={control}
            name="username"
            // onChange={(e) => handlechange(e)}
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

          <Controller //Email Controller
            control={control}
            name="email"
            // onChange={(e) => handlechange(e)}
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

          <Controller // Password Controller
            control={control}
            name="password"
            // onChange={(e) => handlechange(e)}
            rules={{
              required: {
                value: true,
                message: "password is required",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
                message:
                  "Password must have atleast 8 character,1 Upper,1 speacial and 1 number",
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

          <Controller // Confirm Password Controller
            control={control}
            name="confirmpassword"
            rules={{
              required: {
                value: true,
                message: " Confirm password is required",
              },
              // pattern: {
              //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
              //     message: "Password must have atleast 8 character,1 Upper,1 speacial and 1 number",
              // },
            }}
            // onChange={(e) => handlechange(e)}
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
                label="Confirm Password"
                helperText={errors.password?.message}
                type="password"
              />
            )}
          />
          <Grid container xs={12}>
            <Grid item xs={8}>
              <ThemeProvider theme={theme}>
                <Button
                  type="submit"
                  theme={theme}
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </ThemeProvider>
            </Grid>
            <Grid item xs={4}>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary">
                  Login{" "}
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
