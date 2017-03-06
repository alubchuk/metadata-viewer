// @flow
import React, {PropTypes} from 'react';
const Halogen = require('halogen');
import './LinkPreview.css';
import LinkPreviewItem from './LinkPreviewItem';

const LinkPreview = (props: Object) => {
    let content = <Halogen.RingLoader color='#DD0A1A' className='LinkPreview-loader' />;
    if (!props.loading) {
        content = (
            <div>
                <h3>{props.data.length ? props.title : ''}</h3>
                {props.data.map((item: Object, index: number) => <LinkPreviewItem key={index} item={item} />)}
            </div>
        );
    }
    return <div className='LinkPreview'>{content}</div>;
};

LinkPreview.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default LinkPreview;
