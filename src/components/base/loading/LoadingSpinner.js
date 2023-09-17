import React from 'react';
import styled from 'styled-components';
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

export default LoadingSpinner;