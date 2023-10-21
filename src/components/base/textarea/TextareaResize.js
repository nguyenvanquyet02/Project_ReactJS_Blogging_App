import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
const TextareaResize = ({ placeholder = "Nhập bình luận...", ...props }) => {

    const [text, setText] = useState("");
    const textareaRef = useRef(null);
    const [height, setHeight] = useState("38px");

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
                value={text}
                ref={textareaRef}
                style={{
                    height: height
                }}
                onChange={handleChange}
                {...props}
            ></textarea>
        </div>
    );
};

export default TextareaResize;

// import { useController } from "react-hook-form";
// import PropTypes from 'prop-types';
// const TextareaStyles = styled.div`
//   /* position: relative; */
//   /* width: 100%; */
//   textarea {
//     width: 100%;
//     padding: 16px 20px;
//     background-color: transparent;
//     border: 1px solid ${(props) => props.theme.grayf1};
//     border-radius: 8px;
//     transition: all 0.2s linear;
//     color: ${(props) => props.theme.black};
//     font-size: 14px;
//     resize: none;
//     /* min-height: 200px; */
//   }
//   textarea::-webkit-input-placeholder {
//     color: #b2b3bd;
//   }
//   textarea::-moz-input-placeholder {
//     color: #b2b3bd;
//   }
// `;
// /**
//  *
//  * @param {string} name - name of Textarea
//  * @param {string} type - type of Textarea
//  * @param {*} children - children of Textarea
//  * @param {*} control - control from react hook form
//  * @returns Textarea
//  */
// const TextareaResize = ({
//     name = "",
//     type = "text",
//     children,
//     control,
//     ...props
// }) => {
//     // const { field } = useController({
//     //     // control,
//     //     name,
//     //     defaultValue: "",
//     // });
//     const [text, setText] = useState("");
//     const textareaRef = useRef(null);
//     const [height, setHeight] = useState("38px");

//     const handleChange = (e) => {
//         setText(e.target.value);
//     }
//     useEffect(() => {
//         setHeight(`${textareaRef?.current?.scrollHeight}px`);
//     }, [text]);
//     return (
//         <TextareaStyles>
//             <textarea
//                 className="transition-all overflow-hidden w-full p-3 rounded-lg resize-none leading-normal"
//                 id={name}
//                 type={type}
//                 value={text}
//                 style={{
//                     height: height
//                 }}
//                 onChange={handleChange}
//                 // {...field}
//                 {...props}

//             />
//         </TextareaStyles>
//     );

// };
// TextareaResize.prototype = {
//     name: PropTypes.string,
//     type: PropTypes.string,
//     children: PropTypes.any,
//     control: PropTypes.any,
// }
// export default TextareaResize;
