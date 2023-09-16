import IconEyeOpen from '../icons/IconEyeOpen';
import React from 'react';
import { useController } from 'react-hook-form';
import styled from 'styled-components';


const InputStyles = styled.div`
  position: relative;
  width: 100%;
  background-color: #f1f1f3;
    border-radius: 8px;

  input {
    width: 100%;
    padding: ${(props) =>
        props.hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.grayf1};
    border-radius: 8px;
    transition: all 0.2s linear;
    color: ${(props) => props.theme.black};
    font-size: 14px;
    font-weight: 500;
  }
  input:focus{
    background-color: #fff;
    border-color: ${props => props.theme.primary};;
  }
  input::-webkit-input-placeholder {
    color: #b2b3bd;
    font-size: 14px;

  }
  input::-moz-input-placeholder {
    color: #b2b3bd;
    font-size: 14px;

  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    padding: 8px;
  }
`;
const Input = ({ name = "", type = "text", children,
    control, ...props }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: ""
    })
    return (
        <InputStyles hasIcon={children ? true : false}>
            <input type={type} id={name} {...field} {...props} />
            {children ? <div className='input-icon'>{children}</div> : null}
        </InputStyles>
    );
};

export default Input;