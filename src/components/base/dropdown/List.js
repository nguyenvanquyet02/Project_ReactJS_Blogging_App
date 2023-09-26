import React from 'react';
import { useDropdown } from './dropdown-context';
import PropTypes from 'prop-types';

/**
 * @param {*} children children of List 
 * @returns List
 */
const List = ({ children }) => {
    const { show } = useDropdown();
    return (
        <>
            {show && (
                <div className="absolute top-full left-0 w-full bg-[#eee] shadow-sm">
                    {children}
                </div>
            )}
        </>
    );
};
List.prototype = {
    children: PropTypes.any,
}
export default List;