import React, { useEffect } from 'react';
import { Button, Field, Input, Label } from '../components';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db, auth } from '../firebase/firebase-config';
import { NavLink, useNavigate } from 'react-router-dom'
import AuthenticationPage from './AuthenticationPage';
import InputPasswordToggle from '../components/base/input/InputPasswordToggle';
import slugify from 'slugify';
import { userRole, userStatus } from '../utils/constants';

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
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema)
    });
    const handleSignUp = async (values) => {
        if (!isValid) return;
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(auth.currentUser, {
            displayName: values.fullname,
            photoURL: "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",

        })
        //set id thủ công user có cùng id ở authen và db
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            username: slugify(values.fullname, { lower: true }),
            avatar: "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            status: userStatus.ACTIVE,
            role: userRole.USER,
            createdAt: serverTimestamp()
        })
        toast.success("Register successfully!!!");
        navigate("/");
    }
    // handing errors
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