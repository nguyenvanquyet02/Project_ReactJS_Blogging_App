import React from "react";
import { DropdownProvider } from "./dropdown-context";
import PropTypes from 'prop-types';

/**
 * @param {*} children children of Dropdown 
 * @returns Dropdown
 */
const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-[260px] z-50">
        {children}
      </div>
    </DropdownProvider>
  );
};
Dropdown.prototype = {
  children: PropTypes.any,
}
export default Dropdown;
