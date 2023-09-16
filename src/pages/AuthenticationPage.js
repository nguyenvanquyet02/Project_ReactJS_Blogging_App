import React from 'react';
import styled from 'styled-components';

const AuthenticationPageStyles = styled.div`
    min-height: 100vh;
    padding: 40px;
    .logo{
        margin: 0 auto 20px;
    }
    .heading{
        text-align: center;
        color: ${props => props.theme.primary};;
        font-weight: bold;
        font-size: 40;
        margin-bottom: 24px;
    }
    .form{
        max-width: 500px;
        margin: 0 auto;
    }
    .have-account{
        margin-top: 14px;
        margin-bottom: 10;
        a{
            display: inline-block;
            color: ${props => props.theme.primary};
            font-weight: 500;
        }
    }
`;
const AuthenticationPage = ({ children }) => {
    return (
        <AuthenticationPageStyles>
            <div className='container'>
                <img srcSet='./logo.png 11x' alt='logo' className='logo' />
                <h1 className='heading'>Blogging App</h1>
                {children}
            </div>
        </AuthenticationPageStyles>
    );
};

export default AuthenticationPage;