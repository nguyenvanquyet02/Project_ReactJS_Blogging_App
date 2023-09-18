import React from "react";
import PropTypes from "prop-types";

const Toggle = (props) => {
    const { on, onClick, ...rest } = props;

    return (
        <label>
            <input
                type="checkbox"
                checked={on}
                className="hidden-input"
                onChange={() => { }}
                onClick={onClick}
            />
            <div
                className={`inline-block w-[86px] h-[40px] relative cursor-pointer rounded-full p-1 transition-all ${on ? "bg-green-500" : "bg-gray-300"
                    }`}
                {...rest}
            >
                <span
                    className={`transition-all w-[32px] h-[32px] bg-white rounded-full inline-block ${on ? "translate-x-[46px]" : ""
                        }`}
                ></span>
            </div>
        </label>
    );
};

Toggle.propTypes = {
    on: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Toggle;