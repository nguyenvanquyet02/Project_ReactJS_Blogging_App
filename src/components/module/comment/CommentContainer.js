import React from 'react';
import { CommentList } from '.';
import styled from "styled-components";
// import TextareaResize from '../../base/textarea/TextareaResize';
import { ActionSend } from '../../action';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/auth-context';
import Input from '../../base/input/Input';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';

const schema = yup.object({
    comment: yup.string().required("Pls enter your comment!!!"),
}).required();
const CommentContainerStyle = styled.div`
    margin: 50px 0;

    .commentAddNew{
    display: flex;
    column-gap: 14px;
    text-align: center;
    justify-content: center;

        .avatar-user-comment{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            border: 1px solid #eee;

        }
    }
    .form{
        display: flex;
        flex: 1;
        column-gap: 10px;
        align-items: flex-start;
    }
`;

const CommentContainer = ({ postId = "" }) => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const { control, handleSubmit, reset, formState: {
        errors, isValid, isSubmitting
    } } = useForm({
        mode: "onChange",
        defaultValues: {
            comment: "",
        },
        resolver: yupResolver(schema)
    })
    // handle validate form
    useEffect(() => {
        const arrErrors = Object.values(errors)
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
            })
        }
    }, [errors]);
    // this func is used to add a new comment
    const handleAddComment = async (values) => {
        if (!isValid) return;
        if (values.comment !== '') {
            const colRef = collection(db, "comments");
            try {
                await addDoc(colRef, {
                    ...values,
                    userId: userInfo.uid,
                    postId: postId,
                    createdAt: serverTimestamp(),
                });
                toast.success("Add comment successfully!!!");
                reset({
                    commnet: "",
                })
            } catch (error) {
                toast.error("Creating a new comment failed!!!")
                console.log("ERROR: ", error);
            }
            console.log(values);
            console.log(userInfo);
        }

    }
    const handleFocusComment = () => {
        if (userInfo === null) {
            navigate("/sign-in");
        }
    }
    return (
        <CommentContainerStyle>
            <div className='commentAddNew'>
                <img className='avatar-user-comment' srcSet='/logo.png 3x' alt='logo' />

                <form className='form' onSubmit={handleSubmit(handleAddComment)}>
                    {/* <TextareaResize name="comment"
                        control={control} /> */}
                    <Input name='comment'
                        type='text'
                        placeholder="Enter your comment"
                        control={control}
                        onFocus={handleFocusComment}
                    />
                    <button className='mt-1' type='submit'>
                        <ActionSend />
                    </button>

                </form>
            </div>
            <CommentList></CommentList>
        </CommentContainerStyle>
    );
};

export default CommentContainer;