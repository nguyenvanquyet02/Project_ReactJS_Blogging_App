import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Field, IconEyeClose, IconEyeOpen, Input, Label } from '../components';
import { useForm } from 'react-hook-form'

const SignUpPageStyles = styled.div`
    min-height: 100vh;
    padding: 40px;
    .logo{
        margin: 0 auto 20px;
    }
    .heading{
        text-align: center;
        color: ${props => props.theme.primary};;
        font-weight: bold;
        font-size: 40;
        margin-bottom: 40px;
    }
    
    .form{
        max-width: 500px;
        margin: 0 auto;
    }
`;
const SignUpPage = () => {
    const [togglePassword, setTogglePassword] = useState(false);
    const {
        control, handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch
    } = useForm({});
    const handleSignUp = (values) => {
        console.log(values);
    }
    return (
        <SignUpPageStyles>
            <div className='container'>
                <img srcSet='./logo.png 11x' alt='logo' className='logo' />
                <h1 className='heading'>Blogging App</h1>
                <form className='form' onSubmit={handleSubmit(handleSignUp)} autoComplete='off'>
                    <Field>
                        <Label htmlFor='fullname'>Fullname</Label>
                        <Input name='fullname'
                            type='text'
                            placeholder="Enter your fullname"
                            control={control}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor='email'>Email</Label>
                        <Input name='email'
                            type='email'
                            placeholder="Enter your email"
                            control={control}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor='password'>Password</Label>
                        <Input name='password'
                            type={togglePassword ? "text" : "password"}
                            placeholder="Enter your password"
                            control={control}
                        >
                            {togglePassword ?
                                <IconEyeOpen onClick={() => setTogglePassword(!togglePassword)} /> :
                                <IconEyeClose onClick={() => setTogglePassword(!togglePassword)} />}
                        </Input>
                    </Field>
                    <Button>Sign Up</Button>
                </form>
            </div>
        </SignUpPageStyles>
    );
};

export default SignUpPage;