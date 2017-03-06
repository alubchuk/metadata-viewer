// @flow
import './Textarea.css';
import React, {PropTypes} from 'react';

const Textarea = (props: Object) => (
    <textarea {...props}></textarea>
);

Textarea.propTypes = {
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    placeholder: PropTypes.string,
    wrap: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string
};

Textarea.defaultProps = {
    autoFocus: true,
    placeholder: 'Type your search in the following format: @username, #tagname or some site (e.g. https://heise.de, https://amazon.com, https://davidwalsh.name). Delimiters are space, comma and comma + space.',
    wrap: 'hard',
    name: 'search',
    className: 'Textarea'
};

export default Textarea;
