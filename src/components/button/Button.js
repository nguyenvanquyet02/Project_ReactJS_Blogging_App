import React from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../loading/LoadingSpinner';
import PropTypes from 'prop-types';
const ButtonStyles = styled.button`
    cursor: pointer;
    padding: 0 20px;
    line-height: 1;
    color: #fff;
    border-radius: 8px;
    width: 100%;
    height: ${props => props.height || "55px"};;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    transition: all 0.2s linear;
    background-image: linear-gradient(to right bottom,
        ${props => props.theme.primary},
    ${props => props.theme.secondary}
    );
    &:disabled{
        opacity: 0.5;
        pointer-events:none;
    }
    &:hover{
        opacity: 0.8;
    }
`;
/**
 * created by Celine Maris
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type type of button: 'button' || 'submit'
 * @returns 
 */
const Button = ({ type = "button", onClick = () => { }, children, ...props }) => {
    const { isLoading } = props;
    const child = !!isLoading ? <LoadingSpinner /> : children;
    return (
        <ButtonStyles type={type} onClick={onClick} {...props}>
            {child}
        </ButtonStyles>
    );
};
Button.prototype = {
    type: PropTypes.oneOf(["submit", "button"]).isRequired,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
    children: PropTypes.node
}
export default Button;