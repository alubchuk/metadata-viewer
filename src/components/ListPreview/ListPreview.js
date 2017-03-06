// @flow
import './ListPreview.css';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state: Object, ownProps: Object) => ({
    data: state[ownProps.type]
});

export const ListPreview = (props: Object) => (
    props.data.length ?
        <div className="ListPreview">
            <h3>{props.title}:</h3>
            <ul className="ListPreview-container">
                {
                    props.data.map(
                        (item: string, index: number) =>
                        <li key={index} className={`ListPreview-item ${props.itemClassName}`}>
                            {item}
                        </li>)
                }
            </ul>
        </div>
    : null
);

ListPreview.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    itemClassName: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(ListPreview);
