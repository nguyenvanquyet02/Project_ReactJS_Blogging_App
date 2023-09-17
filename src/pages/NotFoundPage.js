import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPageStyles = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 40px;
    .logo{
        display: inline-block;
    }
    .heading{
        font-size: 30px;
        font-weight: 600;
    }
    .btn-back{
        display: inline-block;
        color: #fff;
        border-radius: 8px;
        padding: 15px 30px;
        cursor: pointer;
        background-color: ${props => props.theme.primary};
        font-weight: 500;
    }
`;
const NotFoundPage = () => {
    return (
        <NotFoundPageStyles>
            <NavLink to="/" className='logo'>
                <img srcSet='/logo.png 8x' alt='logo' />
            </NavLink>
            <h1 className='heading'>Oops! Page not found!</h1>
            <NavLink to='/' className='btn-back'>
                Back to Home
            </NavLink>
        </NotFoundPageStyles>
    );
};

export default NotFoundPage;