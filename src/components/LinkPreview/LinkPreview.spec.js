import {shallow} from 'enzyme';
import LinkPreview from './LinkPreview';
import LinkPreviewItem from './LinkPreviewItem';
import React from 'react';

function setup(data = []) {
    const props = {
        data,
        title: 'Metadata Preview'
    };
    const enzymeWrapper = shallow(<LinkPreview {...props} />)
    return {props, enzymeWrapper};
}

describe('LinkPreview', () => {
    it('Should render a component without any errors', () => {
        const {enzymeWrapper} = setup();
        expect(enzymeWrapper);
    });

    it('Should render no LinkPreviewItem components if no data provided', () => {
        const {enzymeWrapper} = setup();
        const linkPreviewItems = enzymeWrapper.find(LinkPreviewItem);
        expect(linkPreviewItems.length).toBe(0);
    });

    it('Should render correct number of LinkPreviewItem components', () => {
        const {enzymeWrapper} = setup([{title: 'Title', description: 'Description'}, {title: 'Title 2', description: 'Description 2'}]);
        const linkPreviewItems = enzymeWrapper.find(LinkPreviewItem);
        expect(linkPreviewItems).toHaveLength(2);
    });
});
