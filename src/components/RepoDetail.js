import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {connect} from 'react-redux'

import store from '../store'

import "./RepoDetail.css";

const BASE_URI = 'https://api.github.com/search/repositories';


class RepoDetail extends Component {
    state = {};
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        const response = await axios.get(`${BASE_URI}?q=repo:${this.props.repo.url}`);
        const repoDetail = response.data.items[0];

        this.setState({
            name: repoDetail.name,
            stargazers_count: repoDetail.stargazers_count,
            forks_count: repoDetail.forks_count,
            open_issues_count: repoDetail.open_issues_count,
            avatar: repoDetail.owner.avatar_url
        });
    }

    handleVoteClick = () => {
        const user = localStorage.user && JSON.parse(localStorage.user);
        const payload = {
            repoId: this.props.repo.id,
            userId: user && user.id
        }

        axios.post('http://localhost:8080/repos', payload, {
            headers: {
                authorization: user && user.token
            }
        }).then(res => {
            // dispatch
            console.log('PAYLOAD ===>', payload)
            store.dispatch({ type: 'VOTE', payload });
        }

        )

    }

    render() {
        const repoInfo = this.props.reposInfoFromGithub[0]

        return (
            <Card className="card">
                <CardHeader avatar={<Avatar alt={this.state.name} src={this.state.avatar} />} title={`Votes: ${this.props.repo.votes.length}`} subheader={this.state.name}>
                </CardHeader>

                <CardContent>
                    <p className="stat">Stargazers: <span>{this.state.stargazers_count}</span></p>
                    <p className="stat">Forked: <span>{this.state.forks_count}</span></p>
                    <p className="stat">Open Issues: <span>{this.state.open_issues_count}</span></p>
                </CardContent>

                <CardActions>

                    <Button size="small" color="primary" disabled={!this.props.canVote} onClick={this.handleVoteClick}>
                        Vote
                        </Button>
                </CardActions>
            </Card>
        );
    }
}

const mapToProps = (state) => ({
    reposInfoFromGithub: state.reposInfoFromGithub
})

export default connect (mapToProps, null)(RepoDetail);


