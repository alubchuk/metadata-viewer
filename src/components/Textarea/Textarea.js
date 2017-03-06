// @flow
import './Textarea.css';
import React, {PropTypes} from 'react';

const Textarea = (props: Object) => (
    <textarea {...props}></textarea>
);

Textarea.propTypes = {
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    cols: PropTypes.number,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
    wrap: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string
};

Textarea.defaultProps = {
    autoFocus: true,
    cols: 60,
    rows: 5,
    placeholder: 'Type your search...',
    wrap: 'hard',
    name: 'search',
    className: 'Textarea'
};

export default Textarea;
