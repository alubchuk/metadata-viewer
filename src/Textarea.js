// @flow
import React, {PropTypes} from 'react';
import './Textarea.css';

const Textarea = (props: Object) => (
    <textarea
        className="Textarea"
        name="search"
        autoFocus="true"
        cols="60"
        rows="5"
        onChange={props.onChange}
        placeholder="Type your search..."
        wrap="hard">
    </textarea>
);

Textarea.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default Textarea;
