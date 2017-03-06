// @flow
import './LinkPreview.css';
const Halogen = require('halogen');
import React, {PropTypes} from 'react';
import LinkPreviewItem from './LinkPreviewItem';

const LinkPreview = (props: Object) => {
    let content = <Halogen.RingLoader color='#DD0A1A' className='LinkPreview-loader' />;
    if (!props.loading) {
        content = (
            <div className='LinkPreview-container'>
                {props.data.map((item: Object, index: number) => <LinkPreviewItem key={index} item={item} />)}
            </div>
        );
    }
    return (
        <div className='LinkPreview'>
            <div>
                <h3>{props.title}:</h3>
                {content}
            </div>
        </div>
    );
};

LinkPreview.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default LinkPreview;
