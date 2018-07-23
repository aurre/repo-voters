import {
    SET_LOADING,
    GET_REPOS_SUCCESS,
    VOTE
} from './actions'

const initialState = {
    isLoading: false,
    repos: []
}
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_REPOS_SUCCESS:
            return {
                ...state,
                repos: action.payload
            };
        case SET_LOADING:
            return { ...state, isLoading: action.payload };
        case VOTE:
            // repoId, userId
            const repos = state.repos.map(r => {
                if (r.id === action.payload.repoId) {
                    r.votes.push(action.payload.userId)
                }

                return r;
            })
            return {
                ...state,
                repos
            }
        default:
            return state
    }
}


export default reducer