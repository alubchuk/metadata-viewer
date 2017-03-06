// @flow
import 'whatwg-fetch';
import config from './config';

const initialState = {
    loading: false,
    users: [],
    tags: [],
    sites: [],
    error: null
};

const CHANGE_USERS = 'CHANGE_USERS';
const CHANGE_TAGS = 'CHANGE_TAGS';
const RESET_STATE = 'RESET_STATE';

const FETCH_SITE_METADATA_PROCESSING = 'FETCH_SITE_METADATA_PROCESSING';
const FETCH_SITE_METADATA_SUCCESS = 'FETCH_SITE_METADATA_SUCCESS';
const FETCH_SITE_METADATA_ERROR = 'FETCH_SITE_METADATA_ERROR';


export const resetState = () => ({type: RESET_STATE});

export const changeUsers = (users: Array<string>) => ({
    type: CHANGE_USERS,
    payload: {users}
});

export const changeTags = (tags: Array<string>) => ({
    type: CHANGE_TAGS,
    payload: {tags}
});

export const changeSites = (sites: Array<string>) => (dispatch: Function) => {
    dispatch({type: FETCH_SITE_METADATA_PROCESSING});
    return Promise.all(
        sites.map(
            (url: string) => fetch(config.metadataServiceUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({url})
            })
            .then((response: Object) => response.json())
            .then((parsedData: Object) => parsedData)
        )
    )
    .then((sites: Array<Object>) => dispatch({type: FETCH_SITE_METADATA_SUCCESS, payload: {sites}}))
    .catch((error: Object) => dispatch({type: FETCH_SITE_METADATA_ERROR, error}))
};

const rootReducer = (state: Object = initialState, action: Object) => {
    switch(action.type) {
        case CHANGE_USERS:
            return {
                ...state,
                users: action.payload.users.slice()
            };
        case CHANGE_TAGS:
            return {
                ...state,
                tags: action.payload.tags.slice()
            };
        case FETCH_SITE_METADATA_PROCESSING:
            return {
                ...state,
                loading: true
            };
        case FETCH_SITE_METADATA_SUCCESS:
            return {
                ...state,
                sites: action.payload.sites,
                loading: false
            };
        case FETCH_SITE_METADATA_ERROR:
            return {
                ...state,
                sites: [],
                loading: false,
                error: action.error
            };
        case RESET_STATE:
            return initialState;
        default:
            return initialState;
    }
};

export default rootReducer;
