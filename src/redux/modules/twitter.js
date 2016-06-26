const SEARCH_TWITTER_USERS = 'twitter/SEARCH_TWITTER_USERS';
const SEARCH_TWITTER_USERS_SUCCESS = 'twitter/SEARCH_TWITTER_USERS_SUCCESS';
const SEARCH_TWITTER_USERS_FAIL = 'twitter/SEARCH_TWITTER_USERS_FAIL';

export function userSearch(name) {
    return {
        types: [SEARCH_TWITTER_USERS, SEARCH_TWITTER_USERS_SUCCESS, SEARCH_TWITTER_USERS_FAIL],
        promise: (client) => client.post('/twitter/userSearch', {
            data: {
                query: name
            }
        })
    };
}

const initialState = {
    users: [],
    loaded: false
};

export default function reducer(state = initialState, action = {}) {
    let out = null;
    switch (action.type) {

        case SEARCH_TWITTER_USERS:
            out = {
                ...state,
                loading: true
            };
            break;

        case SEARCH_TWITTER_USERS_FAIL:
            console.log('*********************** search fail:', action);
            out = state;
            break;

        case SEARCH_TWITTER_USERS_SUCCESS:
            console.log('*********************** search success:', action);
            out = {
                ...state,
                users: action.result.users
            };
            break;

        default:
            console.log('default action: ', action);
            out = state;

            return out;
    }
    return out;
}
