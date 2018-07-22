import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
// import Typography from '@material-ui/core/Typography';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader title="Login"></CardHeader>
                    <CardContent>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="name"
                                label="Name"
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <TextField
                                id="email"
                                label="Email"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                            />
                        </form>

                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            Login
                        </Button>
                    </CardActions>
                </Card>
            </div >
        )
    }
}

export default Login;