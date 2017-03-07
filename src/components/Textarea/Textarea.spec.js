import {shallow} from 'enzyme';
import Textarea from './Textarea';
import React from 'react';

function setup() {
    const props = {
        onChange: jest.fn(),
    }
    const enzymeWrapper = shallow(<Textarea {...props} />)
    return {props, enzymeWrapper};
}

describe('Textarea', () => {
    it('Should render without fails', () => {
        const {enzymeWrapper} = setup();
        expect(enzymeWrapper);
    });

    it('Should call onChange handler with appropriate input', () => {
        const {enzymeWrapper, props} = setup();
        const textarea = enzymeWrapper.find('textarea');
        const e = {target: {value: '@user'}};
        textarea.simulate('change', e);
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenCalledWith(e);
    });
});
