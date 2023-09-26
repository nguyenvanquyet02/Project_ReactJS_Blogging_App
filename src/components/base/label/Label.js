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
 * @param {*} children children of Label
 * @param {string} htmlFor  htmlFor of Label
 * @param {string} className  className of Label
 * @returns Label
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
    className: PropTypes.string,
    htmlFor: PropTypes.string,
    children: PropTypes.node
}
export default Label;