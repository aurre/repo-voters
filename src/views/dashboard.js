import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from '../store'
import axios from 'axios';
import Repos from '../components/Repos'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        const user = localStorage.user && JSON.parse(localStorage.user);
        return axios.get("http://repo-voters.herokuapp.com:4000/repos", {
            headers: {
                authorization: user && user.token
            }
        })
            .then(response => {
                store.dispatch({ type: 'GET_REPOS_SUCCESS', payload: response.data })
            });
    }

    render() {
        return (
            <div>
                <h1> Dashboard works </h1>
                <Repos repos={this.props.repos} />
            </div>
        )
    }
}

const mapToProps = (state) => ({
    repos: state.repos
})

// mapDispatch = (dispatch) => {
//     return {
//         getReposSuccess: dispatch(getReposSuccess())
//     }
// }

export default connect(mapToProps, null)(Dashboard);
