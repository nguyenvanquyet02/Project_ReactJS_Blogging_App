import React from 'react';
import { CommentAddNew, CommentList } from '.';
import styled from "styled-components";

const CommentContainerStyle = styled.div`
    margin: 50px 0;
`;

const CommentContainer = () => {
    return (
        <CommentContainerStyle>
            <CommentAddNew></CommentAddNew>
            <CommentList></CommentList>
        </CommentContainerStyle>
    );
};

export default CommentContainer;