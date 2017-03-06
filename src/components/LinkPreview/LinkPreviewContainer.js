// @flow
import React, {Component, PropTypes} from 'react';
import LinkPreview from './LinkPreview';
import {connect} from 'react-redux';

type stateTypes = {sites: Array<Object>, loading: boolean};
const mapStateToProps = ({sites, loading}: stateTypes) => ({data: sites, loading});

export class LinkPreviewContainer extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired
    };

    shouldComponentUpdate(nextProps: Object) {
        return nextProps.data !== this.props.data;
    }

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

    render() {
        return (
            <LinkPreview
                loading={this.props.loading}
                data={this.getParsedMetadata()}
                title={this.props.title} />
        );
    }
}

export default connect(mapStateToProps)(LinkPreviewContainer);
