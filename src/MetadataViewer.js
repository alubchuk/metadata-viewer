import React, {Component, PropTypes} from 'react';
import './MetadataViewer.css';
import 'whatwg-fetch';
import config from './config';

export default class MetadataViewer extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired
    };

    state = {metadata: []};

    componentWillReceiveProps(props: Object) {
        Promise.all(
            props.data.map(
                (url: string) => fetch(config.metadataServiceUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({url})
                })
                .then((response: Object) => response.json())
                .then((parsedData: Object) => parsedData)
            )
        )
        .then((metadata: Array) => this.setState({metadata}))
        .catch((error: Object) => console.error(error.message))

    }

    renderMetadataItem = (item: Object) => {
        return (
            <div>
                <h4>Title: {item['open_graph'] && item['open_graph']['og:title'] || item.title || ''}</h4>
                <p>Description: {item['open_graph'] && item['open_graph']['og:description'] || item.description || ''}</p>
                <p>URL: {item['open_graph'] && item['open_graph']['og:url'] || ''}</p>
                <p>Image: {item['open_graph'] && item['open_graph']['og:image'] || ''}</p>
            </div>
        );
    };

    render() {
        return (
            <div>
                <h3>{this.state.metadata.length ? this.props.title : ''}</h3>
                {this.state.metadata.map((item: Object) => this.renderMetadataItem(item))}
            </div>
        );
    }
}
