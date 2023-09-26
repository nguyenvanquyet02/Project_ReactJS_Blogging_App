import React from "react";
import { useDropdown } from "./dropdown-context";
import PropTypes from 'prop-types';

/**
 * @param {string} placeholder children Search of Dropdown 
 * @returns Search of Dropdown
 */
const Search = ({ placeholder, ...props }) => {
  const { onChange } = useDropdown();
  return (
    <div className="p-2">
      <input
        type="text"
        placeholder={placeholder}
        className="p-4 outline-none w-full border border-gray-200 rounded"
        onChange={onChange}
        {...props}
      />
    </div>
  );
};
Search.prototype = {
  placeholder: PropTypes.string,
}
export default Search;
