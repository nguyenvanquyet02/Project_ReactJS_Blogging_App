import React from 'react';
import { useDropdown } from './dropdown-context';
import PropTypes from 'prop-types';

/**
 * @param {string} placeholder children Select of Dropdown 
 * @returns Select of Dropdown
 */
const Select = ({ placeholder = '' }) => {
    const { show, toggle } = useDropdown();
    return (
        <div
            className="flex items-center justify-between h-[55px] px-5 bg-[#E7ECF3] rounded cursor-pointer font-medium"
            onClick={toggle}
        >
            <span>{placeholder}</span>
            <span>
                {show ? (
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
                            d="M5 15l7-7 7 7"
                        />
                    </svg>
                ) : (
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
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                )}
            </span>
        </div>
    );
};
Select.prototype = {
    placeholder: PropTypes.string,
}
export default Select;