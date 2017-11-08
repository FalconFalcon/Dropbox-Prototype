import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from './Login';
import Message from './Message';
import Welcome from './Welcome';
import Signup from './Signup';

class NewerHomePage extends Component {
  state = {
    isSignedUp: false,
    isLoggedIn: false,
    message: '',
    username: ''
  };
  //handleSubmit(userdata) {} is the associated equivalent
  handleSubmit = userdata => {
    API.doLogin(userdata).then(status => {
      if (status === 201) {
        this.setState({
          isLoggedIn: true,
          message: 'Welcome to my App..!!',
          username: userdata.username
        });
        this.props.history.push('/welcome');
      } else if (status === 401) {
        this.setState({
          isLoggedIn: false,
          message: 'Wrong username or password. Try again..!!'
        });
      } else if (status === 500) {
        this.setState({
          isLoggedIn: false,
          message: 'Wrong username or password. Try again..!!'
        });
      }
    });
  };

  handleSignUp = userdata => {
    API.doSignUp(userdata).then(status => {
      if (status === 201) {
        this.setState({
          isSignedUp: true,
          message: 'Woop! Login to the application.'
        });
        this.props.history.push('/login');
      } else if (status === 401) {
        this.setState({
          isSignedUp: true,
          message: 'Whaa? You are already registered. Just Login!'
        });
      } else if (status === 500) {
        this.setState({
          isLoggedIn: false,
          message: 'Wrong username or password. Try again..!!'
        });
      }
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <Message message="You have landed on my App !!" />
              <button
                className="btn btn-success"
                onClick={() => {
                  this.props.history.push('/login');
                }}
              >
                Login
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  this.props.history.push('/signup');
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        />

        <Route
          exact
          path="/signup"
          render={() => (
            <div>
              <Signup handleSignUp={this.handleSignUp} />
              <Message message={this.state.message} />
              {this.state.isSignedUp ? <Link to="/login">Login</Link> : null}
            </div>
          )}
        />

        <Route
          exact
          path="/login"
          render={() => (
            <div>
              <Login handleSubmit={this.handleSubmit} />
              <Message message={this.state.message} />
            </div>
          )}
        />
        <Route
          exact
          path="/welcome"
          render={() => <Welcome username={this.state.username} />}
        />
      </div>
    );
  }
}

export default withRouter(NewerHomePage);
