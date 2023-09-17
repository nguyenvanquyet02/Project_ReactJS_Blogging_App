import React from 'react';
import styled, { css } from 'styled-components';
import LoadingSpinner from '../loading/LoadingSpinner';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
const ButtonStyles = styled.button`
    cursor: pointer;
    padding: 0 20px;
    line-height: 1;
    border-radius: 8px;
    width: 100%;
    height: ${props => props.height || "55px"};;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    transition: all 0.2s linear;
    ${props => props.kind === 'secondary' && css`
        background-color: #fff;
        color: ${props => props.theme.primary};
    `};
    ${props => props.kind === 'primary' && css`
        color: #fff;
        background-image: linear-gradient(to right bottom,
            ${props => props.theme.primary},
            ${props => props.theme.secondary}
        );
    `};
    
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
 * @param {string} to url of page
 * @param {boolean} isLoading loading button
 * @param {string} kind kind of button ["primary", "secondary"]
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type type of button: 'button' || 'submit'
 * @returns 
 */
const Button = ({ type = "button",
    onClick = () => { },
    children,
    kind = 'primary',
    ...props }) => {
    const { isLoading, to } = props;
    const child = !!isLoading ? <LoadingSpinner /> : children;
    if (to !== "" && typeof to === 'string') {
        return (
            <NavLink to={to} style={{ display: "inline-block" }}>
                <ButtonStyles type={type} kind={kind} {...props}>
                    {child}
                </ButtonStyles>
            </NavLink>
        )
    }
    return (
        <ButtonStyles type={type} onClick={onClick} kind={kind} {...props}>
            {child}
        </ButtonStyles>
    );
};
Button.prototype = {
    type: PropTypes.oneOf(["submit", "button"]).isRequired,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
    children: PropTypes.node,
    kind: PropTypes.oneOf(["primary", "secondary"])
}
export default Button;