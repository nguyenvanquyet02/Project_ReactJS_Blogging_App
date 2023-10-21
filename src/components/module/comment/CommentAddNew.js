import React from 'react';
import styled from "styled-components";
import { useAuth } from '../../../contexts/auth-context';
import TextareaResize from '../../base/textarea/TextareaResize';
import { ActionSend } from '../../action';

const CommentAddNewStyle = styled.div`
    display: flex;
    column-gap: 10px;
    text-align: center;
    justify-content: center;
    .avatar-user-comment{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid #eee;

    }
`;
const CommentAddNew = () => {
    const { userInfo } = useAuth();
    console.log(userInfo);
    return (
        <CommentAddNewStyle>
            <img className='avatar-user-comment' src="https://media.istockphoto.com/id/1498838344/photo/grumpy-persian-waiting-on-food.webp?b=1&s=170667a&w=0&k=20&c=LjAK_5FedDnEnip4MwdaV32Jbp9aNix0VRk2Lb4uaag=" alt="avatar user" />
            <TextareaResize></TextareaResize>
            <ActionSend
            // onClick={() => navigate(`/${post.slug}`)}

            ></ActionSend>

        </CommentAddNewStyle>
    );
};

export default CommentAddNew;