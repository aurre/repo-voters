import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Login from './views/Login';
import Dashboard from './views/dashboard';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.user
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

function App(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Repo Voter
              </Typography>
              <Button>
                <Link to="/login">Login</Link>
              </Button>
              {/* <Button containerElement={<Link to="/login">Login</Link>} primary={true} /> */}
            </Toolbar>
          </AppBar>
          <Route path='/login' component={Login} />
          <PrivateRoute path='/' component={Dashboard} />
        </div>
      </Router>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

