// @flow
import './LinkPreview.css';
import React, {PropTypes} from 'react';
import LinkPreviewItem from './LinkPreviewItem';

const LinkPreview = (props: Object) => (
    <div className='LinkPreview'>
        <h3>{props.title}:</h3>
        <div className='LinkPreview-container'>
            {props.data.map((item: Object, index: number) => <LinkPreviewItem key={index} item={item} />)}
        </div>
    </div>
);

LinkPreview.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default LinkPreview;
