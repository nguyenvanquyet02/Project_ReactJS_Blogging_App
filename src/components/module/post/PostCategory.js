import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const PostCategoryStyles = styled.div`
    cursor: pointer;
    display: inline-block;
    padding: 4px 10px;
    border-radius: 8px;
    color: ${props => props.theme.gray6B};
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    a{
        display: block;
    }
    ${props => props.type === 'primary' && css`
        background-color: ${props => props.theme.grayF3};
    
    `};
    ${props => props.type === 'secondary' && css`
        background-color: ${props => props.theme.white};
    `};
`;
const PostCategory = ({ children, type = 'primary', to = "", className = '' }) => {
    return (
        <PostCategoryStyles type={type} className={`post-category ${className}`}>
            <Link to={`/category/${to}`}>
                {children}
            </Link>
        </PostCategoryStyles>
    );
};

export default PostCategory;