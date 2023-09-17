import React, { Fragment, useState } from 'react';
import Input from './Input';
import IconEyeOpen from '../icons/IconEyeOpen';
import IconEyeClose from '../icons/IconEyeClose';

const InputPasswordToggle = ({ control }) => {
    const [togglePassword, setTogglePassword] = useState(false);
    if (!control) return null;
    return (
        <Fragment>
            <Input name='password'
                type={togglePassword ? "text" : "password"}
                placeholder="Enter your password"
                control={control}
            >
                {togglePassword ?
                    <IconEyeOpen onClick={() => setTogglePassword(!togglePassword)} /> :
                    <IconEyeClose onClick={() => setTogglePassword(!togglePassword)} />}
            </Input>
        </Fragment>
    );
};

export default InputPasswordToggle;