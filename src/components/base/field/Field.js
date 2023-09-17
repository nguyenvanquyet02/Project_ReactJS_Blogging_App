import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'
/**
 * Created by Celine Maris
 * 
 */
const FieldStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 6px;
    margin-bottom: 20px;

    &:last-child{
        margin-bottom: 0;
    }
`;
const Field = ({ children }) => {
    return (
        <FieldStyles>{children}</FieldStyles>
    );
};
Field.prototype = {
    children: PropTypes.node
}
export default Field;