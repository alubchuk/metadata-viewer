// @flow
import React, {Component, PropTypes} from 'react';
import './LinkPreview.css';
const Halogen = require('halogen');

export default class LinkPreview extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired
    };

    getParsedMetadata() {
        return this.props.data.map((item: Object) => {
            const {open_graph, title = '', description = '', url = '', image = ''} = item;
            if (open_graph) {
                return {
                    title: open_graph['og:title'] || title,
                    description: open_graph['og:description'] || description,
                    url: open_graph['og:url'] || url,
                    image: open_graph['og:image'] || image
                };
            }
            return {
                title, description, url, image
            };
        });
    }

    renderMetadataItem = (item: Object) => {
        return (
            <div>
                <h4>Title: {item.title}</h4>
                <p>Description: {item.description}</p>
                <p>URL: {item.url ? <a href={item.url}>{item.url}</a> : ''}</p>
                <p>Image: {item.image ? <img src={item.image} role='presentation' /> : ''}</p>
            </div>
        );
    };

    renderMetadataContent() {
        if (this.props.loading) {
            return (
                <Halogen.RingLoader color='#DD0A1A' className='LinkPreview-loader' />
            );
        }
        return (
            <div>
                <h3>{this.props.data.length ? this.props.title : ''}</h3>
                {this.getParsedMetadata().map((item: Object) => this.renderMetadataItem(item))}
            </div>
        );
    }

    render() {
        return (
            <div className='LinkPreview'>{this.renderMetadataContent()}</div>
        );
    }
}
