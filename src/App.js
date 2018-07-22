import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Login from './views/Login';
import Dashboard from './views/dashboard';

import NavBar from './components/NavBar';


const styles = {
  root: {
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

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Router>
          <div>
            <NavBar></NavBar>
            <Route path='/login' component={Login} />
            <PrivateRoute path='/' component={Dashboard} />
          </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

