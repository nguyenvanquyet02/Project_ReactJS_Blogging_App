import React from 'react';
import styled from 'styled-components';

const CommentItemStyle = styled.div`

    display: flex;
    column-gap: 16px;
    width: 100%;
    overflow: hidden;
    .avatar-user-comment{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid #eee;

    }
`;
const CommentItem = ({ userId = "", content = "" }) => {
    return (
        <CommentItemStyle>
            <img className='avatar-user-comment' src="https://media.istockphoto.com/id/1498838344/photo/grumpy-persian-waiting-on-food.webp?b=1&s=170667a&w=0&k=20&c=LjAK_5FedDnEnip4MwdaV32Jbp9aNix0VRk2Lb4uaag=" alt="avatar user" />
            <div className='bg-slate-200 p-3 rounded-lg'>
                <p className='font-bold'>Celine Maris</p>
                <p className='w-full'>{content || "Withurious. In a way, it matches this hypothesis that perhaps many developers are relying a lot on codecode"}</p>
            </div>
        </CommentItemStyle>
    );
};

export default CommentItem;