import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthenticationPage from './AuthenticationPage';
import { Button, Field, IconEyeClose, IconEyeOpen, Input, Label } from '../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';


const schema = yup.object({
    email: yup.string().email().required("Please enter your email!"),
    password: yup.string().min(8, "Your password must be at least 8 characters").required("Please enter your password!"),
}).required();
const SignInPage = () => {
    const [togglePassword, setTogglePassword] = useState(false);
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const { control, handleSubmit, formState: {
        errors, isValid, isSubmitting
    } } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        document.title = "Login page"
        if (userInfo?.email) navigate("/")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleSignIn = async (values) => {
        if (!isValid) return;
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/")
    }
    useEffect(() => {
        const arrErrors = Object.values(errors)
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
            })
        }
    }, [errors])
    return (
        <AuthenticationPage>
            <form className='form' onSubmit={handleSubmit(handleSignIn)} autoComplete='off'>
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
                <Button
                    type='submit'
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                >
                    Sign In
                </Button>
                <div className='have-account'>
                    <p>You don't have an account? <NavLink to={"/sign-up"}>Register.</NavLink></p>
                </div>
            </form>
        </AuthenticationPage>
    );
};

export default SignInPage;