import React from "react";
import { useController } from "react-hook-form";
import PropTypes from 'prop-types';

/**
 * 
 * @param {*} checked checked of Radio 
 * @param {*} children children of Radio 
 * @param {*} control control of Radio using with react hook form 
 * @param {*} name name of Radio 
 * @returns Radio
 */
const Radio = ({ checked, children, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        onChange={() => { }}
        checked={checked}
        type="radio"
        className="hidden-input"
        {...field}
        {...rest}
      />
      <div className="flex items-center gap-x-3 font-medium cursor-pointer">
        <div
          className={`w-7 h-7 rounded-full ${checked ? "bg-green-400" : "bg-gray-200"
            }`}
        ></div>
        <span>{children}</span>
      </div>
    </label>
  );
};
Radio.prototype = {
  checked: PropTypes.bool,
  children: PropTypes.any,
  control: PropTypes.any,
  name: PropTypes.string,
}
export default Radio;
