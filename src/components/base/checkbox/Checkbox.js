import React from "react";
import { useController } from "react-hook-form";
import PropTypes from 'prop-types';

/**
 * 
 * @param {*} checked checked of checkbox 
 * @param {*} children children of checkbox 
 * @param {*} control control of checkbox using with react hook form 
 * @param {*} name name of checkbox 
 * @returns Checkbox
 */
const Checkbox = ({ checked, children, control, name, ...rest }) => {
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
        type="checkbox"
        className="hidden-input"
        {...field}
        {...rest}
      />
      <div className="flex items-center gap-x-3 font-medium cursor-pointer">
        <div
          className={`w-7 h-7 rounded flex items-center justify-center ${checked ? "bg-green-400 text-white" : "bg-gray-200 text-transparent"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span>{children}</span>
      </div>
    </label>
  );
};

Checkbox.prototype = {
  checked: PropTypes.bool,
  children: PropTypes.any,
  control: PropTypes.any,
  name: PropTypes.string,
}
export default Checkbox;
