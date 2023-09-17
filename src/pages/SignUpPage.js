import React, { useEffect } from 'react';
import { Button, Field, Input, Label } from '../components';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../firebase/firebase-config';
import { NavLink, useNavigate } from 'react-router-dom'
import AuthenticationPage from './AuthenticationPage';
import InputPasswordToggle from '../components/base/input/InputPasswordToggle';

const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname!"),
    email: yup.string().email().required("Please enter your email!"),
    password: yup.string().min(8, "Your password must be at least 8 characters").required("Please enter your password!"),
}).required();

const SignUpPage = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        watch,
        reset
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    });
    const handleSignUp = async (values) => {
        if (!isValid) return;
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(auth.currentUser, {
            displayName: values.fullname
        })
        const colRef = collection(db, "users")
        await addDoc(colRef, {
            fullname: values.fullname,
            email: values.email,
            password: values.password
        })
        toast.success("Register successfully!!!");
        navigate("/");
    }
    useEffect(() => {
        document.title = "Register page"
        const arrErrors = Object.values(errors)
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
            })
        }
    }, [errors])
    return (
        <AuthenticationPage>
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
                    <InputPasswordToggle control={control}></InputPasswordToggle>
                </Field>

                <Button
                    type='submit'
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                >
                    Sign Up
                </Button>
                <div className='have-account'>
                    <p>You already have an account? <NavLink to={"/sign-in"}>Login.</NavLink></p>
                </div>
            </form>
        </AuthenticationPage>
    );
};

export default SignUpPage;