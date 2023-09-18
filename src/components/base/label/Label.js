import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const LabelStyles = styled.label`
    color: ${props => props.theme.grayDark};
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
`;
/**
 * 
 * @param {*} children  
 * @param {string} htmlFor  
 * @returns 
 */
const Label = ({ htmlFor = "", children, className = "", ...props }) => {
    return (
        <LabelStyles
            className={className}
            htmlFor={htmlFor}
            {...props}
        >
            {children}
        </LabelStyles>
    );
};
Label.prototype = {
    htmlFor: PropTypes.string,
    children: PropTypes.node
}
export default Label;