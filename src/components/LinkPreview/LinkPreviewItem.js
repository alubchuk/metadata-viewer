// @flow
import React, {PropTypes} from 'react';

const LinkPreviewItem = ({item}: {item: Object}) => (
    <div>
        <h4>Title: {item.title}</h4>
        <p>Description: {item.description}</p>
        <p>URL: {item.url ? <a href={item.url}>{item.url}</a> : ''}</p>
        <p>Image: {item.image ? <img src={item.image} role='presentation' /> : ''}</p>
    </div>
);

LinkPreviewItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default LinkPreviewItem;
