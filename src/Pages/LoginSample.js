import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const LoginSample = () => {
    const { control, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                email: "",
                password: ""
            }
        }
    );
    const handleOnSubmit = (data) => {
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <Controller
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
                <Controller
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
                            error={!!errors.password}
                            margin="dense"
                            size="small"
                            fullWidth
                            value={field.value}
                            onChange={field.onChange}
                            inputRef={field.ref}
                            label="First Name"
                            helperText={errors.password?.message}
                            type="password"
                        />
                        
                    )}
                />
                <Button type='submit'>Log In</Button>
            </form>
        </div>
    )
}

export default LoginSample