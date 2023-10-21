import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import PropTypes from 'prop-types';


/**
 *
 * @param {string} name - name of TextareaResize
 * @param {string} type - type of TextareaResize
 * @param {*} children - children of TextareaResize
 * @param {*} control - control from react hook form
 * @returns TextareaResize
 */
const TextareaResize = ({
    name = "",
    control,
    type = "text",
    children,
    placeholder = "Nhập bình luận...",
    ...props }) => {

    const [text, setText] = useState("");
    const textareaRef = useRef(null);
    const [height, setHeight] = useState("38px");
    const { field } = useController({
        control,
        name,
        defaultValue: "",
    });
    const handleChange = (e) => {
        setText(e.target.value);
    }
    useEffect(() => {
        setHeight(`${textareaRef?.current?.scrollHeight}px`);
    }, [text]);
    return (
        <div
            style={{
                height: height
            }}
            className='transition-all w-full rounded-2xl overflow-hidden border-[1px] border-gray-400'
        >
            <textarea
                className="transition-all overflow-hidden p-3 rounded-lg w-full h-full resize-none leading-normal"
                placeholder={placeholder}
                id={name}
                value={text}
                ref={textareaRef}
                style={{
                    height: height
                }}
                type={type}
                {...field}
                onChange={handleChange}
                {...props}
            ></textarea>
        </div>
    );
};
TextareaResize.prototype = {
    name: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.any,
    control: PropTypes.any,
}
export default TextareaResize;
