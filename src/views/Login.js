import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: '',
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.error = '';
        axios.post('https://repo-voters.herokuapp.com:4000/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then(res => {
                localStorage.user = JSON.stringify(res.data.user);
                this.props.history.push('/');
            })
            .catch(err => {
                this.error = 'Invalid username and/or password';
            });
    }

    render() {
        return (
            <div>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>

                    <Card>
                        <CardHeader title="Login"></CardHeader>
                        <CardContent>
                            <TextField
                                id="username"
                                label="name"
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                                margin="normal"
                            />
                            <TextField
                                id="password"
                                label="password"
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                                type="password"
                            />
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" type="submit">
                                Login
                        </Button>
                        </CardActions>
                    </Card>
                </form>

            </div >
        )
    }
}

export default Login;