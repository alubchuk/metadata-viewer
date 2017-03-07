// @flow
import * as api from '../framework/api';

export const initialState = {
    loading: false,
    users: [],
    tags: [],
    sites: [],
    error: ''
};

export const UPDATE_USERS = 'UPDATE_USERS';
export const UPDATE_TAGS = 'UPDATE_TAGS';
export const RESET_STATE = 'RESET_STATE';

export const FETCH_SITE_METADATA_PROCESSING = 'FETCH_SITE_METADATA_PROCESSING';
export const FETCH_SITE_METADATA_SUCCESS = 'FETCH_SITE_METADATA_SUCCESS';
export const FETCH_SITE_METADATA_ERROR = 'FETCH_SITE_METADATA_ERROR';

export const resetState = () => ({type: RESET_STATE});

export const updateUsers = (users: Array<string>) => ({
    type: UPDATE_USERS,
    payload: {users}
});

export const updateTags = (tags: Array<string>) => ({
    type: UPDATE_TAGS,
    payload: {tags}
});

export const updateSites = (sites: Array<string>) => (dispatch: Function) => {
    dispatch({type: FETCH_SITE_METADATA_PROCESSING});
    return api.fetchMetadata(sites)
        .then(
            (result: Array<Object>) =>
                dispatch({
                    type: FETCH_SITE_METADATA_SUCCESS,
                    payload: {sites: result.map((r: Object) => r.data)}
                })
        )
        .catch(
            (error: Object) =>
                dispatch({
                    type: FETCH_SITE_METADATA_ERROR,
                    error: error.response.data
                })
        );
};

export default function (state: Object = initialState, action: Object) {
    switch(action.type) {
        case UPDATE_USERS:
            return {
                ...state,
                users: action.payload.users.slice()
            };
        case UPDATE_TAGS:
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
                error: action.error.message
            };
        case RESET_STATE:
            return initialState;
        default:
            return initialState;
    }
}
