import {shallow} from 'enzyme';
import App from './App';
import React from 'react';
import Textarea from '../Textarea/Textarea';
import ListPreviewContainer from '../ListPreview/ListPreview';
import LinkPreviewContainer from '../LinkPreview/LinkPreviewContainer';

function setup() {
  const props = {
    onChange: jest.fn(),
    title: 'Some Test Title',
    users: [],
    tags: [],
    loading: false
  }
  const enzymeWrapper = shallow(<App {...props} />)
  return {props, enzymeWrapper};
}

describe('App Component', () => {
    it('Should render App without a crash', () => {
        const {enzymeWrapper} = setup();
        expect(enzymeWrapper);
    });

    it('Renders Textarea component', () => {
        const {enzymeWrapper} = setup();
        const TextareaComponents = enzymeWrapper.find(Textarea);
        expect(TextareaComponents.length).toBe(1);
    });

    it('Calls onChange handler of Textarea provided in props', () => {
        const {enzymeWrapper, props} = setup();
        const textarea = enzymeWrapper.find(Textarea);
        textarea.props().onChange('@');
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenCalledWith('@');
    });

    it('Renders 2 ListPreviewContainers', () => {
        const {enzymeWrapper} = setup();
        const ListPreviewContainers = enzymeWrapper.find(ListPreviewContainer);
        expect(ListPreviewContainers.length).toBe(2);
    });

    it('Renders 1 LinkPreviewContainer', () => {
        const {enzymeWrapper} = setup();
        const LinkPreviewContainers = enzymeWrapper.find(LinkPreviewContainer);
        expect(LinkPreviewContainers.length).toBe(1);
    });
});
