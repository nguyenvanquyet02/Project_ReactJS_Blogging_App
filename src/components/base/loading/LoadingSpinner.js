import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * 
 * @param {string} size size of LoadingSpinner 
 * @param {string} borderSize borderSize of LoadingSpinner 
 * @returns LoadingSpinner
 */
const SpinnerStyles = styled.div`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    border: ${(props) => props.borderSize} solid #fff;
    border-top: ${(props) => props.borderSize} solid transparent;
    border-radius: 100rem;
    display: inline-block;
    animation: spinner 2s linear;

    @keyframes spinner {
        100%{
            transform: rotate(360deg);
        }
    }
`;
const LoadingSpinner = ({ size = "32px", borderSize = "5px" }) => {
    return <SpinnerStyles size={size} borderSize={borderSize} />

};
LoadingSpinner.prototype = {
    size: PropTypes.string,
    borderSize: PropTypes.string,
}
export default LoadingSpinner;