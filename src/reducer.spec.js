import testReducer from './testReducer';
import reducer, {
    initialState,
    CHANGE_USERS,
    CHANGE_TAGS,
    RESET_STATE,
    FETCH_SITE_METADATA_PROCESSING,
    FETCH_SITE_METADATA_SUCCESS,
    FETCH_SITE_METADATA_ERROR,
    changeUsers,
    changeTags,
    changeSites,
    resetState
} from './reducer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const httpMock = new MockAdapter(axios);

const usersMock = ['User 1', 'User 2'];
const tagsMock = ['Tag1', 'Tag2'];
const sitesMock = ['https://davidwalsh.name'];

const metadataMock = {
  "open_graph": {
    "og:locale": "en_US",
    "og:type": "website",
    "og:title": "David Walsh Blog",
    "og:description": "A blog featuring tutorials about JavaScript, HTML5, AJAX, PHP, CSS, WordPress, and everything else development.",
    "og:url": "https://davidwalsh.name/",
    "og:site_name": "David Walsh Blog",
    "og:image": "https://davidwalsh.name/wp-content/themes/punky/images/logo.png"
  },
  "title": "David Walsh Blog - JavaScript Consultant",
  "images": [],
  "description": "A blog featuring tutorials about JavaScript, HTML5, AJAX, PHP, CSS, WordPress, and everything else development."
};

const errorMock = {message: 'Data was not loaded'};

// REDUCER tests
describe('Reducer tests', () => {
    describe('Simple List Preview of Users and Tags', () => {
        it('Should return a list of new users', testReducer(
            reducer,
            initialState,
            {type: CHANGE_USERS, payload: {users: usersMock}},
            {...initialState, users: usersMock}
        ));

        it('Should return a list of new tags', testReducer(
            reducer,
            initialState,
            {type: CHANGE_TAGS, payload: {tags: tagsMock}},
            {...initialState, tags: tagsMock}
        ))
    });

    describe('Site Metadata Preview of Links', () => {
        it('Should change the Loading flag', testReducer(
            reducer,
            initialState,
            {type: FETCH_SITE_METADATA_PROCESSING},
            {...initialState, loading: true}
        ));

        it('Should change the list of loaded sites metadata', testReducer(
            reducer,
            initialState,
            {type: FETCH_SITE_METADATA_SUCCESS, payload: {sites: sitesMock}},
            {...initialState, loading: false, sites: sitesMock}
        ));

        it('Should set the error', testReducer(
            reducer,
            initialState,
            {type: FETCH_SITE_METADATA_ERROR, error: errorMock},
            {...initialState, loading: false, error: errorMock}
        ));
    });

    describe('Resetting the store', () => {
        it('Should reset the store to the initialState', testReducer(
            reducer,
            {...initialState, loading: true},
            {type: RESET_STATE},
            initialState
        ));
    });
});

// ACTION CREATORS tests
describe('Action Creators tests', () => {
    // SYNC ACTION CREATORS tests
    describe('Simple List Preview of Users and Tags', () => {
        it('Should return an action for changing the users', () => {
            expect(changeUsers(usersMock)).toEqual({type: CHANGE_USERS, payload: {users: usersMock}});
        });

        it('Should return an action for changing the tags', () => {
            expect(changeTags(tagsMock)).toEqual({type: CHANGE_TAGS, payload: {tags: tagsMock}});
        });
    });

    describe('Resetting the store', () => {
        it('Should return an action for resetting the store to the initialState', () => {
            expect(resetState()).toEqual({type: RESET_STATE});
        })
    });
    // ASYNC ACTION CREATORS tests
    describe('Site Metadata Preview of Links', () => {
        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        afterEach(() => httpMock.reset());

        it('dispatch processing and success', (done) => {
            const store = mockStore(initialState);
            httpMock.onPost().reply(200, metadataMock);

            const expectedActions = [
                {type: FETCH_SITE_METADATA_PROCESSING},
                {type: FETCH_SITE_METADATA_SUCCESS, payload: {sites: [metadataMock]}}
            ];

            store.dispatch(changeSites(sitesMock)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                done();
            });
        });

        it('dispatch error', (done) => {
            const store = mockStore(initialState);
            httpMock.onPost().reply(500, {message: 'Something went wrong'});

            const expectedActions = [
                {type: FETCH_SITE_METADATA_PROCESSING},
                {type: FETCH_SITE_METADATA_ERROR, error: {message: 'Something went wrong'}},
            ];
            store.dispatch(changeSites(sitesMock)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                done();
            })
        });
    });
});
