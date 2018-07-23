/*
 * action types
 */

export const SET_LOADING = 'SET_LOADING'
export const GET_REPOS = 'GET_REPOS'
export const GET_REPOS_SUCCESS = 'GET_REPOS_SUCCESS'
export const GET_REPOS_FAILED = 'GET_REPOS_FAILED'
export const VOTE = 'VOTE'
export const VOTE_SUCCESS = 'VOTE_SUCCESS'
export const VOTE_FAILED = 'VOTE_FAILED'

/*
 * action creators
 */

export function getRepos() {
    return { type: GET_REPOS }
}

export function getReposSuccess() {
    return { type: GET_REPOS_SUCCESS, payload: [] }
}

export function getReposFailed() {
    return { type: GET_REPOS_FAILED }
}