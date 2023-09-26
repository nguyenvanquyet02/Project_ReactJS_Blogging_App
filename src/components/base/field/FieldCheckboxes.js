import React from "react";
import PropTypes from 'prop-types';
/**
 * 
 * @param {*} children children of  FieldCheckboxes
 * @returns FieldCheckboxes
 */
const FieldCheckboxes = ({ children }) => {
  return <div className="flex flex-wrap gap-5">{children}</div>;
};
FieldCheckboxes.prototype = {
  children: PropTypes.any,
}
export default FieldCheckboxes;
