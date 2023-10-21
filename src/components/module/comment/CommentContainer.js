import React from 'react';
import { CommentAddNew, CommentList } from '.';
import styled from "styled-components";
import TextareaResize from '../../base/textarea/TextareaResize';
import { ActionSend } from '../../action';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../contexts/auth-context';

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

const CommentContainer = () => {
    const { userInfo } = useAuth();
    const { control, handleSubmit, formState: {
        errors, isValid, isSubmitting
    } } = useForm({
        mode: "onChange",
    })
    const handleAddComment = (values) => {
        if (!isValid) {
            console.log(values);
            console.log(userInfo);

        }
    }
    return (
        <CommentContainerStyle>
            <div className='commentAddNew'>

                <img className='avatar-user-comment' src="https://media.istockphoto.com/id/1498838344/photo/grumpy-persian-waiting-on-food.webp?b=1&s=170667a&w=0&k=20&c=LjAK_5FedDnEnip4MwdaV32Jbp9aNix0VRk2Lb4uaag=" alt="avatar user" />

                <form className='form' onSubmit={handleSubmit(handleAddComment)}>
                    <TextareaResize name="comment"
                        control={control} />
                    <button className='mt-1' type='submit'>
                        <ActionSend
                        // onClick={() => navigate(`/${post.slug}`)}

                        ></ActionSend>
                    </button>

                </form>
            </div>
            <CommentList></CommentList>
        </CommentContainerStyle>
    );
};

export default CommentContainer;