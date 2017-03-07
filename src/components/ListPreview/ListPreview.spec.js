import {shallow} from 'enzyme';
import {ListPreview} from './ListPreview';
import React from 'react';

function setup(config = {}) {
    const {type = '', data = [], title = '', itemClassName = ''} = config;
    const props = {type, data, title, itemClassName};
    const enzymeWrapper = shallow(<ListPreview {...props} />)
    return {props, enzymeWrapper};
}

const ListPreviewSelector = '.ListPreview-container';
const ListPreviewItemSelector = '.ListPreview-item-tag';

describe('ListPreview', () => {
    it('Should render ListPreview without errors', () => {
        const {enzymeWrapper} = setup();
        expect(enzymeWrapper);
    });

    it('Should render no list preview if there is no data provided', () => {
        const {enzymeWrapper} = setup();
        expect(enzymeWrapper.find(ListPreviewSelector)).not.toHaveLength(1);
    });

    it('Should render list of tags', () => {
        const {enzymeWrapper} = setup({data: ['tag1', 'tag2', 'tag3'], itemClassName: 'tag'});
        const listPreviewContainer = enzymeWrapper.find(ListPreviewSelector);
        const listPreviewItems = listPreviewContainer.find(ListPreviewItemSelector);
        expect(listPreviewContainer).toHaveLength(1);
        expect(listPreviewItems).toHaveLength(3);
    });
});
