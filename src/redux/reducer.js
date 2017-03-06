// @flow
import * as api from '../framework/api';

export const initialState = {
    loading: false,
    users: [],
    tags: [],
    sites: [],
    error: ''
};

export const CHANGE_USERS = 'CHANGE_USERS';
export const CHANGE_TAGS = 'CHANGE_TAGS';
export const RESET_STATE = 'RESET_STATE';

export const FETCH_SITE_METADATA_PROCESSING = 'FETCH_SITE_METADATA_PROCESSING';
export const FETCH_SITE_METADATA_SUCCESS = 'FETCH_SITE_METADATA_SUCCESS';
export const FETCH_SITE_METADATA_ERROR = 'FETCH_SITE_METADATA_ERROR';

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
                error: action.error.message
            };
        case RESET_STATE:
            return initialState;
        default:
            return initialState;
    }
}
