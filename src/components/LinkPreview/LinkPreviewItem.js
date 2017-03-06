// @flow
import React, {PropTypes} from 'react';

const LinkPreviewItem = ({item}: {item: Object}) => (
    <div className='LinkPreview-item'>
        <div className='LinkPreview-item-image'>{item.image ? <img src={item.image} width="224" height="126" role='presentation' /> : ''}</div>
        <div className='LinkPreview-item-title'>{item.title}</div>
        <div className='LinkPreview-item-description'>{item.description}</div>
        <div className='LinkPreview-item-url'>{item.url ? <a href={item.url}>{item.url}</a> : ''}</div>
    </div>
);

LinkPreviewItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default LinkPreviewItem;
