import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from '../store'
import axios from 'axios';
import Repos from '../components/Repos';
import OpenIssuesChart from '../components/OpenIssueChart';
import ForksChart from '../components/ForksChart';
import StarsChart from '../components/StarsChart';
import Grid from '@material-ui/core/Grid';
import '../components/OpenIssuesChart.css'

const BASE_URI = 'https://api.github.com/search/repositories';


class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        const user = localStorage.user && JSON.parse(localStorage.user);
        await axios.get(`http://localhost:8080/users/repos`, {
            headers: {
                authorization: user && user.token
            }
        })
            .then(response => {
                store.dispatch({ type: 'GET_REPOS_SUCCESS', payload: response.data })
            });
        this.getFrameworks();

    }

    // updates dashboard avery 5 minutes
    getFrameworks = async () => {
        const q = this.props.repos.reduce((a, b) => {
            return a += `repo:${b.url} `
        }, '');

        let reposGithubInfo = await axios.get(`${BASE_URI}?q=${q}`)

        store.dispatch({ type: 'REPOS_INFO_GITHUB', payload: reposGithubInfo.data.items })

        setTimeout(() => {
            this.getFrameworks();
        }, 300000);
    }

    render() {
        return (
            <div>
                <h1> Dashboard </h1>
                <Repos repos={this.props.repos} />
                <br />
                <Grid container spacing={8} className="root">
                    <OpenIssuesChart />
                    <ForksChart />
                    <StarsChart />
                </Grid>
            </div>
        )
    }
}

const mapToProps = (state) => ({
    repos: state.repos
})



export default connect(mapToProps, null)(Dashboard);
