import React from "react";
import { DropdownProvider } from "./dropdown-context";
const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-[260px] z-50">
        {children}
      </div>
    </DropdownProvider>
  );
};

export default Dropdown;
