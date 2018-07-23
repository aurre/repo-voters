import React, { Component } from 'react'
import RepoDetail from '../components/RepoDetail';
import './Repos.css';

class Repos extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    canVote = () => {
        const user = localStorage.user && JSON.parse(localStorage.user);
        return user && !this.props.repos.find(r => r.votes.find(v => v === user.id));
    }

    render() {
        return (
            <div className="repo-list">
                {
                    this.props.repos.map(r => (
                        <RepoDetail repo={r} canVote={this.canVote()} key={r.id} />
                    ))
                }
            </div>
        );
    }
}

export default Repos;