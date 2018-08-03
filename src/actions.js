
/*
 * action types
 */

export const SET_LOADING = 'SET_LOADING'
export const GET_REPOS = 'GET_REPOS'
export const GET_REPOS_SUCCESS = 'GET_REPOS_SUCCESS'
export const GET_REPOS_FAILED = 'GET_REPOS_FAILED'
export const VOTE = 'VOTE'
export const REPOS_INFO_GITHUB = 'REPOS_INFO_GITHUB'

/*
 * action creators
 */

export function getRepos() {
    return { type: GET_REPOS }
}

export function getReposSuccess(payload) {
    return { type: GET_REPOS_SUCCESS, payload }
}

export function getReposFailed() {
    return { type: GET_REPOS_FAILED }
}

export function getRepoInfoGithub(payload) {
    return { type: REPOS_INFO_GITHUB, payload }
}

export function upVote(payload) {
    return {type: VOTE, payload}
}