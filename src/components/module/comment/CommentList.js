import React from 'react';
import CommentItem from './CommentItem';
import styled from 'styled-components';
import { Heading } from '../../layouts';


const CommentListStyle = styled.div`
    /* background-color: aqua; */
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    row-gap: 18px;
`;
const CommentList = () => {
    return (
        <CommentListStyle>
            <Heading>Bình luận liên quan</Heading>
            <CommentItem />
            <CommentItem />
            <CommentItem />
        </CommentListStyle>
    );
};

export default CommentList;