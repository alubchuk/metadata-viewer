import {shallow} from 'enzyme';
import React from 'react';
import {AppContainer} from './AppContainer';
import App from './App';
import * as utils from '../../framework/utils';
import constants from '../../framework/constants';

function setup() {
  const props = {
    loading: false,
    users: [],
    tags: [],
    sites: [],
    utils: {
        parseQuery: jest.fn((config) => utils.parseQuery(config)),
        urlValidator: jest.fn(() => utils.urlValidator())
    },
    queryConfig: constants.queryConfig,
    updateUsers: jest.fn(),
    updateTags: jest.fn(),
    updateSites: jest.fn(),
    resetState: jest.fn()
  }
  const enzymeWrapper = shallow(<AppContainer {...props} />)
  return {props, enzymeWrapper};
}

describe('AppContainer', () => {
    it('Should render AppContainer without a crash', () => {
        const {enzymeWrapper} = setup();
        expect(enzymeWrapper);
    });

    it('Should render App component', () => {
        const {enzymeWrapper} = setup();
        const app = enzymeWrapper.find(App);
        expect(app.length).toBe(1);
    });

    it('Should call resetState for empty query', () => {
        const {enzymeWrapper, props} = setup();
        const app = enzymeWrapper.find(App);
        const e = {target: {value: ''}};
        app.props().onChange(e);
        expect(props.resetState).toHaveBeenCalledTimes(1);
    });

    it('Should parse the query without errors', () => {
        const {enzymeWrapper, props} = setup();
        const app = enzymeWrapper.find(App);
        const e = {target: {value: '#tag'}};
        app.props().onChange(e);
        expect(props.utils.parseQuery).toHaveBeenCalledTimes(1);
        expect(props.utils.parseQuery).toHaveBeenCalledWith({
            query: e.target.value,
            queryConfig: props.queryConfig,
            urlValidator: props.utils.urlValidator
        });
    });

    it('Should call only updateUsers', () => {
        const {enzymeWrapper, props} = setup();
        const app = enzymeWrapper.find(App);
        const e = {target: {value: '@u'}};
        app.props().onChange(e);
        expect(props.utils.urlValidator).toHaveBeenCalledTimes(0);
        expect(props.updateUsers).toHaveBeenCalledTimes(1);
        expect(props.updateUsers).toHaveBeenCalledWith(['u']);
        expect(props.updateTags).toHaveBeenCalledTimes(0);
        expect(props.updateSites).toHaveBeenCalledTimes(0);
        expect(props.resetState).toHaveBeenCalledTimes(0);
    });

    it('Should call only updateTags', () => {
        const {enzymeWrapper, props} = setup();
        const app = enzymeWrapper.find(App);
        const e = {target: {value: '#tag'}};
        app.props().onChange(e);
        expect(props.utils.urlValidator).toHaveBeenCalledTimes(0);
        expect(props.updateTags).toHaveBeenCalledTimes(1);
        expect(props.updateTags).toHaveBeenCalledWith(['tag']);
        expect(props.updateUsers).toHaveBeenCalledTimes(0);
        expect(props.updateSites).toHaveBeenCalledTimes(0);
        expect(props.resetState).toHaveBeenCalledTimes(0);
    });

    it('Should call only updateSites', () => {
        const {enzymeWrapper, props} = setup();
        const app = enzymeWrapper.find(App);
        const e = {target: {value: 'http://davidwalsh.name'}};
        app.props().onChange(e);
        expect(props.utils.urlValidator).toHaveBeenCalledTimes(1);
        expect(props.updateSites).toHaveBeenCalledTimes(1);
        expect(props.updateSites).toHaveBeenCalledWith(['http://davidwalsh.name']);
        expect(props.updateUsers).toHaveBeenCalledTimes(0);
        expect(props.updateTags).toHaveBeenCalledTimes(0);
        expect(props.resetState).toHaveBeenCalledTimes(0);
    });

    it('Should add new user to existing one', () => {
        const {enzymeWrapper, props} = setup();
        const app = enzymeWrapper.find(App);
        const e = {target: {value: '@user1 @user2'}};
        app.props().onChange(e);
        expect(props.utils.urlValidator).toHaveBeenCalledTimes(0);
        expect(props.updateUsers).toHaveBeenCalledTimes(1);
        expect(props.updateUsers).toHaveBeenCalledWith(['user1', 'user2']);
        expect(props.updateTags).toHaveBeenCalledTimes(0);
        expect(props.updateSites).toHaveBeenCalledTimes(0);
        expect(props.resetState).toHaveBeenCalledTimes(0);
    });

    it('Should be able to add users, tags and sites altogether', () => {
        const {enzymeWrapper, props} = setup();
        const app = enzymeWrapper.find(App);
        const e = {target: {value: '@user1 #tag1, https://yandex.ua @user2, #tag2,https://heise.de'}};
        app.props().onChange(e);
        expect(props.utils.urlValidator).toHaveBeenCalledTimes(2);
        expect(props.updateUsers).toHaveBeenCalledTimes(1);
        expect(props.updateUsers).toHaveBeenCalledWith(['user1', 'user2']);
        expect(props.updateTags).toHaveBeenCalledTimes(1);
        expect(props.updateTags).toHaveBeenCalledWith(['tag1', 'tag2']);
        expect(props.updateSites).toHaveBeenCalledTimes(1);
        expect(props.updateSites).toHaveBeenCalledWith(['https://yandex.ua', 'https://heise.de']);
        expect(props.resetState).toHaveBeenCalledTimes(0);
    });
});
