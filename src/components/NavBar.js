import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = {
    flex: {
        flexGrow: 1,
    }
}

const NavBar = (props) => {
    const { classes, history } = props;
    const user = localStorage.user && JSON.parse(localStorage.user)
    const isLoggedIn = user && user.token;

    const handleLogoutClick = () => {
        localStorage.removeItem('user');
        history.push('/login');
    }


    let button;
    if (isLoggedIn) {
        button = <Button color="secondary" onClick={handleLogoutClick}>Logout</Button>
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Repo Voter
              </Typography>
                {button}
            </Toolbar>
        </AppBar>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);

