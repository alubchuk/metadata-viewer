import React, {PropTypes} from 'react';
import './ListPreview.css';

const ListPreview = (props: Object) => (
    props.data.length ?
        <div className="ListPreview">
            <h3>{props.title}:</h3>
            <ul className="ListPreview-container">
                {props.data.map((item: string) => <li className="ListPreview-item">{item}</li>)}
            </ul>
        </div>
    : null
);

ListPreview.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default ListPreview;
